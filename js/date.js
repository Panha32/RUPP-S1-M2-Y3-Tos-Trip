const checkInPicker = flatpickr("#checkIn", {
    dateFormat: "Y-m-d",
    altInput: true,    
    altFormat: "d M Y",          
    minDate: "today", 
    onChange: function(selectedDates, dateStr, instance) {
        checkOutPicker.set('minDate', dateStr);
    }
});

const checkOutPicker = flatpickr("#checkOut", {
    dateFormat: "Y-m-d",
    altInput: true,    
    altFormat: "d M Y",          
    minDate: "today"
});

let calculateDay = () => {
    const checkInDay = checkInPicker.selectedDates[0];
    const checkOutDay = checkOutPicker.selectedDates[0];

    if(checkInDay && checkOutDay) {
        const diffTime = Math.abs(checkOutDay - checkInDay);
        const diffDay = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        console.log(diffDay);
    }
}