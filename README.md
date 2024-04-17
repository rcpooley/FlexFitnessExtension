# Zumba Extension

## First time setup

Run

```bash
$ cp config.example.js config.js
```

Then update config.js with any custom settings.

## Examples

### Not signed up, spots open

1:

```json
{
    "fitnessClassSessionID": 1696598,
    "fitnessClassSessionSignupID": 0,
    "startDateTime": "2024-04-15T07:30:00",
    "endDateTime": "2024-04-15T08:00:00",
    "startDateTimeOffset": "2024-04-15T07:30:00-07:00",
    "endDateTimeOffset": "2024-04-15T08:00:00-07:00",
    "startTimezone": "America/Los_Angeles",
    "endTimezone": "America/Los_Angeles",
    "createdTZ": "America/Los_Angeles",
    "className": "*Cycle",
    "description": "Indoor cycling class that combines jumps, intervals, hills and sprints to promote total body and aerobic fitness. Cycle is a group cycling class set to music and performed on a specialized bike.  You must reserve your bike with the front desk prior to class.\n\n  \n\nAs a friendly reminder:\n\n• Your reservation is only for the class reserved.\n\n• Please arrive 5 minutes prior to your reservation.\n\n• We offer a 5-minute grace period; if you arrive 5 minutes after the class start time, your reservation will be forfeited.\n\n• We ask that you sanitize all equipment before and after each use.",
    "location": "MPK19 Fitness Studio",
    "instructor": "Kelley A",
    "fitnessClassTypeID": 10,
    "sessionStatusMessage": 7,
    "deliveryType": 1,
    "deliveryDetails": "",
    "signUpWindow": 0,
    "isReminder": false
}
```

### Already signed up

1:

```json
{
    "fitnessClassSessionID": 1697282,
    "fitnessClassSessionSignupID": 2832240,
    "startDateTime": "2024-04-15T17:00:00",
    "endDateTime": "2024-04-15T17:45:00",
    "startDateTimeOffset": "2024-04-15T17:00:00-07:00",
    "endDateTimeOffset": "2024-04-15T17:45:00-07:00",
    "startTimezone": "America/Los_Angeles",
    "endTimezone": "America/Los_Angeles",
    "createdTZ": "America/Los_Angeles",
    "className": "*Zumba",
    "description": "Zumba®- Come join the party with Latin inspired dancing that will increase your cardiovascular endurance and tone and sculpt your body.\n\n  \n\nAs a friendly reminder:\n\n• Your reservation is only for the class reserved.\n\n• Please arrive 5 minutes prior to your reservation.\n\n• We offer a 5-minute grace period; if you arrive 5 minutes after the class start time, your reservation will be forfeited.\n\n• We ask that you sanitize all equipment before and after each use.",
    "location": "MPK19",
    "instructor": "Laam W",
    "fitnessClassTypeID": 2,
    "sessionStatusMessage": 2,
    "deliveryType": 1,
    "deliveryDetails": "",
    "signUpWindow": 0,
    "isReminder": false
},
```

2:

```json
{
    "fitnessClassSessionID": 1697815,
    "fitnessClassSessionSignupID": 2832242,
    "startDateTime": "2024-04-16T17:00:00",
    "endDateTime": "2024-04-16T17:55:00",
    "startDateTimeOffset": "2024-04-16T17:00:00-07:00",
    "endDateTimeOffset": "2024-04-16T17:55:00-07:00",
    "startTimezone": "America/Los_Angeles",
    "endTimezone": "America/Los_Angeles",
    "createdTZ": "America/Los_Angeles",
    "className": "(Full) *Zumba",
    "description": "Zumba®- Come join the party with Latin inspired dancing that will increase your cardiovascular endurance and tone and sculpt your body.\n\n  \n\nAs a friendly reminder:\n\n• Your reservation is only for the class reserved.\n\n• Please arrive 5 minutes prior to your reservation.\n\n• We offer a 5-minute grace period; if you arrive 5 minutes after the class start time, your reservation will be forfeited.\n\n• We ask that you sanitize all equipment before and after each use.",
    "location": "MPK19 Studio",
    "instructor": "Elizabeth B",
    "fitnessClassTypeID": 2,
    "sessionStatusMessage": 2,
    "deliveryType": 1,
    "deliveryDetails": "",
    "signUpWindow": 0,
    "isReminder": false
}
```

### On the waitlist

```json
{
    "fitnessClassSessionID": 1697301,
    "fitnessClassSessionSignupID": 2836688,
    "startDateTime": "2024-04-15T18:00:00",
    "endDateTime": "2024-04-15T18:55:00",
    "startDateTimeOffset": "2024-04-15T18:00:00-07:00",
    "endDateTimeOffset": "2024-04-15T18:55:00-07:00",
    "startTimezone": "America/Los_Angeles",
    "endTimezone": "America/Los_Angeles",
    "createdTZ": "America/Los_Angeles",
    "className": "(Full) *Power Yoga",
    "description": "Power Yoga - An athletic style of vinyasa yoga, strongly rooted in traditional Ashtanga. Participants move through a series of postures combining movement with breath, while building strength and flexibility. Best for those with previous yoga experience, or the adventurous beginner.\n\n  \n\nAs a friendly reminder:\n\n• Your reservation is only for the class reserved.\n\n• Please arrive 5 minutes prior to your reservation.\n\n• We offer a 5-minute grace period; if you arrive 5 minutes after the class start time, your reservation will be forfeited.\n\n• We ask that you sanitize all equipment before and after each use.",
    "location": "MPK19 Studio",
    "instructor": "Elizabeth B",
    "fitnessClassTypeID": 4,
    "sessionStatusMessage": 3,
    "deliveryType": 1,
    "deliveryDetails": "",
    "signUpWindow": 0,
    "isReminder": false
}
```

### Class full, waitlist open:

1:

```json
{
    "fitnessClassSessionID": 1695006,
    "fitnessClassSessionSignupID": 0,
    "startDateTime": "2024-04-11T18:00:00",
    "endDateTime": "2024-04-11T18:55:00",
    "startDateTimeOffset": "2024-04-11T18:00:00-07:00",
    "endDateTimeOffset": "2024-04-11T18:55:00-07:00",
    "startTimezone": "America/Los_Angeles",
    "endTimezone": "America/Los_Angeles",
    "createdTZ": "America/Los_Angeles",
    "className": "(Full) *H.I.I.T. ",
    "description": "H.I.I.T. - Class includes short, high-intensity intervals combined with active recovery designed to train the body for improved performance and calorie burning.  This format offers the perfect blend of speed, quickness and agility drills.\n\n  \n\nAs a friendly reminder:\n\n• Your reservation is only for the class reserved.\n\n• Please arrive 5 minutes prior to your reservation.\n\n• We offer a 5-minute grace period; if you arrive 5 minutes after the class start time, your reservation will be forfeited.\n\n• We ask that you sanitize all equipment before and after each use.",
    "location": "MPK19 Studio",
    "instructor": "Kelley A",
    "fitnessClassTypeID": 6,
    "sessionStatusMessage": 11,
    "deliveryType": 1,
    "deliveryDetails": "",
    "signUpWindow": 0,
    "isReminder": false
}
```

2:

```json
{
    "fitnessClassSessionID": 1697301,
    "fitnessClassSessionSignupID": 0,
    "startDateTime": "2024-04-15T18:00:00",
    "endDateTime": "2024-04-15T18:55:00",
    "startDateTimeOffset": "2024-04-15T18:00:00-07:00",
    "endDateTimeOffset": "2024-04-15T18:55:00-07:00",
    "startTimezone": "America/Los_Angeles",
    "endTimezone": "America/Los_Angeles",
    "createdTZ": "America/Los_Angeles",
    "className": "(Full) *Power Yoga",
    "description": "Power Yoga - An athletic style of vinyasa yoga, strongly rooted in traditional Ashtanga. Participants move through a series of postures combining movement with breath, while building strength and flexibility. Best for those with previous yoga experience, or the adventurous beginner.\n\n  \n\nAs a friendly reminder:\n\n• Your reservation is only for the class reserved.\n\n• Please arrive 5 minutes prior to your reservation.\n\n• We offer a 5-minute grace period; if you arrive 5 minutes after the class start time, your reservation will be forfeited.\n\n• We ask that you sanitize all equipment before and after each use.",
    "location": "MPK19 Studio",
    "instructor": "Elizabeth B",
    "fitnessClassTypeID": 4,
    "sessionStatusMessage": 11,
    "deliveryType": 1,
    "deliveryDetails": "",
    "signUpWindow": 0,
    "isReminder": false
}
```

### Waitlist full:

1:

```json
{
    "fitnessClassSessionID": 1697833,
    "fitnessClassSessionSignupID": 0,
    "startDateTime": "2024-04-16T18:00:00",
    "endDateTime": "2024-04-16T18:55:00",
    "startDateTimeOffset": "2024-04-16T18:00:00-07:00",
    "endDateTimeOffset": "2024-04-16T18:55:00-07:00",
    "startTimezone": "America/Los_Angeles",
    "endTimezone": "America/Los_Angeles",
    "createdTZ": "America/Los_Angeles",
    "className": "(Full) *H.I.I.T. ",
    "description": "H.I.I.T. - Class includes short, high-intensity intervals combined with active recovery designed to train the body for improved performance and calorie burning.  This format offers the perfect blend of speed, quickness and agility drills.\n\n  \n\nAs a friendly reminder:\n\n• Your reservation is only for the class reserved.\n\n• Please arrive 5 minutes prior to your reservation.\n\n• We offer a 5-minute grace period; if you arrive 5 minutes after the class start time, your reservation will be forfeited.\n\n• We ask that you sanitize all equipment before and after each use.",
    "location": "MPK19 Studio",
    "instructor": "Kelley A",
    "fitnessClassTypeID": 6,
    "sessionStatusMessage": 9,
    "deliveryType": 1,
    "deliveryDetails": "",
    "signUpWindow": 0,
    "isReminder": false
}
```

2:

```json
{
    "fitnessClassSessionID": 1695006,
    "fitnessClassSessionSignupID": 0,
    "startDateTime": "2024-04-11T18:00:00",
    "endDateTime": "2024-04-11T18:55:00",
    "startDateTimeOffset": "2024-04-11T18:00:00-07:00",
    "endDateTimeOffset": "2024-04-11T18:55:00-07:00",
    "startTimezone": "America/Los_Angeles",
    "endTimezone": "America/Los_Angeles",
    "createdTZ": "America/Los_Angeles",
    "className": "(Full) *H.I.I.T. ",
    "description": "H.I.I.T. - Class includes short, high-intensity intervals combined with active recovery designed to train the body for improved performance and calorie burning.  This format offers the perfect blend of speed, quickness and agility drills.\n\n  \n\nAs a friendly reminder:\n\n• Your reservation is only for the class reserved.\n\n• Please arrive 5 minutes prior to your reservation.\n\n• We offer a 5-minute grace period; if you arrive 5 minutes after the class start time, your reservation will be forfeited.\n\n• We ask that you sanitize all equipment before and after each use.",
    "location": "MPK19 Studio",
    "instructor": "Kelley A",
    "fitnessClassTypeID": 6,
    "sessionStatusMessage": 9,
    "deliveryType": 1,
    "deliveryDetails": "",
    "signUpWindow": 0,
    "isReminder": false
}
```

## Requests

### Add to waitlist response

```json
{
    "fitnessClassSessionSignupId": 1234567,
    "fitnessClassSessionId": 1234567,
    "userId": 1234567,
    "status": 3,
    "attended": null
}
```

## Notes

sessionStatusMessage

-   7 - not signed up & spots are available
-   9 - not signed up & waitlist is full
-   11 - not signed up & waitlist is open
-   2 - signed up
-   3 - on the waitlist
-   5 - class is in the past
