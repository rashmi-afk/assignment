import Attendance from "../models/attendance.js";

/**
 * @desc    Employee punch in / punch out
 * @route   POST /api/attendance
 * @access  Employee
 */
export const markAttendance = async (req, res) => {
  try {
    const { date, check_in, check_out } = req.body;

    if (!date || !check_in) {
      return res.status(400).json({ message: "Date and check-in are required" });
    }

    // 🔒 Calculate status in backend (do NOT trust frontend)
    let status = "Present";
    if (!check_out) status = "Half-day";

    const attendance = await Attendance.create({
      employee_id: req.user.id,
      date,
      check_in,
      check_out,
      status,
    });

    res.status(201).json({
      success: true,
      data: attendance,
    });
  } catch (error) {
    // Prevent duplicate attendance per day
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Attendance already marked for this day",
      });
    }

    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Get monthly attendance of one employee
 * @route   GET /api/attendance?employee_id=&month=&year=
 * @access  Admin
 */
export const getAttendanceByEmployee = async (req, res) => {
  try {
    const { employee_id, month, year } = req.query;

    if (!employee_id || !month || !year) {
      return res
        .status(400)
        .json({ message: "Employee, month and year are required" });
    }

    const monthNum = Number(month);
    const yearNum = Number(year);

    if (monthNum < 1 || monthNum > 12) {
      return res.status(400).json({ message: "Invalid month" });
    }

    const startDate = new Date(yearNum, monthNum - 1, 1);
    const endDate = new Date(yearNum, monthNum, 0, 23, 59, 59);

    const records = await Attendance.find({
      employee_id,
      date: { $gte: startDate, $lte: endDate },
    }).sort({ date: 1 });

    res.json({
      success: true,
      count: records.length,
      data: records,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Get daily attendance for all employees
 * @route   GET /api/attendance/daily?date=
 * @access  Admin
 */
export const getDailyAttendance = async (req, res) => {
  try {
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({ message: "Date is required" });
    }

    const start = new Date(date);
    const end = new Date(date);
    end.setHours(23, 59, 59);

    if (isNaN(start.getTime())) {
      return res.status(400).json({ message: "Invalid date format" });
    }

    const attendance = await Attendance.find({
      date: { $gte: start, $lte: end },
    }).populate("employee_id", "name department");

    res.json({
      success: true,
      count: attendance.length,
      data: attendance,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Update attendance (admin correction)
 * @route   PUT /api/attendance/:id
 * @access  Admin
 */
export const updateAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!attendance) {
      return res.status(404).json({ message: "Attendance not found" });
    }

    res.json({
      success: true,
      data: attendance,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const punchIn = async(req,res)=>{

try{

const today=new Date();

today.setHours(0,0,0,0);


// already punched ?

const existing = await Attendance.findOne({

employee_id:req.user.id,

date:today

});

if(existing){

return res.status(400).json({

message:"Already punched in"

})

}


const attendance=await Attendance.create({

employee_id:req.user.id,

date:new Date(),

check_in:new Date(),

status:"Present"

});


res.status(201).json({

success:true,

data:attendance

});

}catch(error){

res.status(500).json({

message:error.message

});

}

}
export const punchOut = async(req,res)=>{

try{

const start=new Date();

start.setHours(0,0,0,0);

const end=new Date();

end.setHours(23,59,59,999);


const attendance=await Attendance.findOne({

employee_id:req.user.id,

date:{

$gte:start,

$lte:end

}

});


if(!attendance){

return res.status(404).json({

message:"Punch in first"

})

}


// already punched out ?

if(attendance.check_out){

return res.status(400).json({

message:"Already punched out"

})

}


attendance.check_out=new Date();

attendance.status="Present";

await attendance.save();


res.json({

success:true,

data:attendance

});

}catch(error){

res.status(500).json({

message:error.message

});

}

}

