
// เช็คว่าวันที่ validated ไหม
function isValidDate(selectedDate) {
    //GET TO DAY DATE AND THEN MAKE RANGE TO DAY TO PAST YEAR (1 YEAR RANGE)
    //IF INPUT SELECTEDDATE IS IN RAGE RETURN TRUE
    //ELSE NOT
    if (!selectedDate) {
        return false;
      }
    
      // Convert the selectedDate string to a Date object
      const selectedDateTime = new Date(selectedDate);
    
      // Get today's date
      const today = new Date();
    
      // Calculate the date from one year ago
      const oneYearAgo = new Date();
      oneYearAgo.setFullYear(today.getFullYear() - 1);
    
      // Check if the selectedDate is within the past year
      return selectedDateTime >= oneYearAgo && selectedDateTime <= today;
}

//เมื่อเลือกวันที่ จะเปลี่ยนวันที่ที่โชว์ใหม่
function changeDate(elementId, newDate) {
    //IF DATE IS NOT VALID RETURN FALSE
    //IF DATE IS VALID CHANGE DATE IN "ELEMENTID" THEN RETURN NEWDATE
}

//หลัง submit form แล้ววันที่ยังคงเป็นวันเดิม เพื่อให้พร้อมกับการกรอก transaction ต่อไป
function submitDate(date){
    //IF DATE IS VALID RETURN DATE, IF NOT RETURN FALSE
    //DEFAULT RETURN TRUE
}



module.exports = {
    isValidDate,
    changeDate,
    submitDate
  };
