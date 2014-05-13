(function() {
  // configure moment langs to display relative time our way
  moment.lang('en', {
    relativeTime: {
        future: "in %s",
        past: "%s ago",
        s:  "1 sec",
        m:  "1 min",
        mm: "%d min",
        h:  "1 hr",
        hh: "%d hrs",
        d:  "1 day",
        dd: function(number) { // number is number of days
          // round to the closest number of weeks
          var weeks = Math.round(number / 7);
          if (number < 14) {
            // if less than a week, use days
            return number + " days";
          } else {
            // pluralize weeks
            return weeks + " week" + (weeks === 1 ? "" : "s"); 
          }
        },
        M:  "1 mo",
        MM: "%d mos",
        //y:  "1 yr",
        y: function(number) {
          var daysPast365 = number % 365;
          if (daysPast365 < 90) {
            return "1 yr";
          } else {
            return "1 and a half yrs";
          }
        },
        //yy: "%d yrs"
        yy: function(number) {
          console.log(number);
          return "%d yrs"
        }
    }
  });
})();