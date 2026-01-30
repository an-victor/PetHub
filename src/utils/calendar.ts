/**
 * Generates a Google Calendar event URL
 */
export const generateGoogleCalendarUrl = (event: {
    title: string;
    description: string;
    location?: string;
    startTime: Date;
    endTime?: Date;
}) => {
    const { title, description, location, startTime, endTime } = event;

    // Default duration 1 hour if no end time
    const end = endTime || new Date(startTime.getTime() + 60 * 60 * 1000);

    const formatDate = (date: Date) => date.toISOString().replace(/-|:|\.\d\d\d/g, "");

    const params = new URLSearchParams({
        action: 'TEMPLATE',
        text: title,
        details: description,
        location: location || '',
        dates: `${formatDate(startTime)}/${formatDate(end)}`,
    });

    return `https://calendar.google.com/calendar/render?${params.toString()}`;
};

/**
 * Generates an .ics file content for download (Universal support: iOS, Outlook, etc.)
 */
export const generateICSFile = (event: {
    title: string;
    description: string;
    location?: string;
    startTime: Date;
    endTime?: Date;
}) => {
    const { title, description, location, startTime, endTime } = event;
    const end = endTime || new Date(startTime.getTime() + 60 * 60 * 1000);

    const formatDate = (date: Date) => date.toISOString().replace(/-|:|\.\d\d\d/g, "");

    return `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
URL:${document.location.href}
DTSTART:${formatDate(startTime)}
DTEND:${formatDate(end)}
SUMMARY:${title}
DESCRIPTION:${description}
LOCATION:${location || ''}
END:VEVENT
END:VCALENDAR`;
};

/**
 * Triggers a download of the .ics file
 */
export const downloadICS = (filename: string, content: string) => {
    const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${filename}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};
