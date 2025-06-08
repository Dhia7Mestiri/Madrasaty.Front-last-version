import { CalendarService   } from '@services/calendar/calendar.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup         } from '@angular/forms';
import { CalendarOptions,
         DateSelectArg,
         EventApi,
         EventClickArg     } from '@fullcalendar/angular'; 
// import { Popover        } from 'bootstrap';

import { EventsService       } from '@services/events/events.service';;
import { MembersListService  } from '@services/members/members-list.service';
import { NotificationService } from '@services/notification/notification.service';

import { CalendarEvent } from '@models/calendar-event';
import { Event         } from '@models/Event';

import frLocale from '@fullcalendar/core/locales/fr'; 


@Component({
    selector   : 'app-calendar',
    templateUrl: './calendar.component.html',
    styleUrls  : ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit
{
    examslist = [];
    eventlist = []
    Courslist = []
    Holidaylist = []
    calendarBills = [];
    examslist1: CalendarEvent
    TODAY_STR = new Date().toISOString().replace(/T.*$/, '');
    currentEvents: EventApi[] = [];
    eventGuid = 0;
    calendarOptions: CalendarOptions
    rowData = [];
    selected = true
    eventForm: FormGroup;
    displayResponsive
    MemberStatusIdList
    event
    title
    isEdit = false
    eventType
    eventData
    selectedEventId
    eventsList

    constructor(private notification: NotificationService, private calendarService: CalendarService,
        private eventsService: EventsService, private memberService: MembersListService)
    { }

    ngOnInit()
    {
        this.eventForm = this.eventsService.createEventForm({});
        this.memberService.getMemberStatus().subscribe((memberStatusData) => {
            this.MemberStatusIdList = memberStatusData
        });
        this.initilizeAllEvents();
    }

    initilizeAllEvents()
    {
        

        this.calendarService.getCoursEvent().subscribe(Cours => {
            this.Courslist = Cours.map((e: any) => {
                return { id: e.id, title: e.title, start: e.start, end: e.end, eventType: e.eventType, color: e.color };
            });
            console.log(this.Courslist);
            this.InitializCalendar();
        });
        this.calendarService.getHolidaysEvent().subscribe(holidays => {
            this.Holidaylist = holidays.map((e: any) => {
                return { id: e.id, title: e.title, start: e.start, end: e.end, eventType: e.eventType, color: e.color };
            });
            this.InitializCalendar();
        });

        this.calendarService.getExamensEvent().subscribe(exams => {
            this.examslist = exams.map((e: any) => {
                return { id: e.id, title: e.title, start: e.StartDate, end: e.EndDate, eventType: e.eventType, color: e.color };
            });
            this.InitializCalendar();
        });

        this.calendarService.getEvents().subscribe((eventsList) => {
            this.eventlist = eventsList.map((e: any) => {
                return { id: e.id, title: e.title, start: e.StartDate, end: e.EndDate, eventType: e.eventType, color: e.color };
            });

            this.InitializCalendar();
        });
    }

    /*InitializCalendar()
    {
        this.calendarOptions = {
            height: 700,
            aspectRatio: 0.2,
            locale: frLocale,
            initialView: 'dayGridMonth',
            headerToolbar: {
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',

            },

            weekends: true,
            editable: true,
            selectable: true,

            selectMirror: true,
            dayMaxEvents: false,
            select: this.handleDateSelect.bind(this),
            eventClick: this.handleEventClick.bind(this),
            events: this.Holidaylist.concat(this.eventlist, this.examslist, this.Courslist),
            eventDidMount: this.showToolTip.bind(this),
        };
    }*/
      InitializCalendar()
{
    this.calendarOptions = {
        height: 700,
        aspectRatio: 0.2,
        
        locale: frLocale,
        timeZone: 'Africa/Tunis',
     
        initialView: 'timeGridDay',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',

        },
        nowIndicator: true,
        //allDaySlot: false,
        slotDuration: '00:15:00', // 30 minute slots
        slotMinTime: '08:00:00',  // Start at 8am
        slotMaxTime: '20:00:00',  // End at 8pm
        slotLabelFormat: {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false // Use 24-hour format
          },
          dayHeaderFormat: { 
            weekday: 'long', 
            day: 'numeric', 
            month: 'short' 
          },

        weekends: true,
        editable: true,
        selectable: true,

        selectMirror: true,
        dayMaxEvents: false,
        
        select: this.handleDateSelect.bind(this),
        
        eventClick: this.handleEventClick.bind(this),
        events: this.currentEvents.concat(this.eventlist, this.examslist, this.Courslist,this.Holidaylist),
        eventDidMount: this.showToolTip.bind(this),
        
    };
    console.log("Calendar initialized with events:", this.calendarOptions.events);

}

    showToolTip(mouseEnterInfo)
    {
        // new Popover(mouseEnterInfo.el, {
        //     title: mouseEnterInfo.event.title,
        //     placement: 'top',
        //     trigger: 'hover',
        //     container: 'body',
        // });
    }

    handleDateSelect(selectInfo: DateSelectArg)
    {
        var EventDates = { start: selectInfo.startStr, end: selectInfo.endStr }
        this.showBasicDialog(-1)
        this.eventForm.patchValue({
            StartDate: new Date(EventDates.start),
            EndDate: new Date(EventDates.end),
        });
    }

    showBasicDialog(id)    
    {
        this.displayResponsive = true;
        this.title = id === -1 ? 'Ajouter un évènement' : 'modifier un évènement';
        this.eventsService.getEvent(id)
            .subscribe({
                next: (event: Event) => this.displayEvent(event),
                error: err => console.log(err)
            });
    }

    handleEventClick(clickInfo: EventClickArg)
    {
        this.eventType = clickInfo.event.extendedProps.eventType
        this.selectedEventId = clickInfo.event.id
        this.isEdit = true;
        if (this.eventType == "course") {
            this.showBasicDialog(this.selectedEventId);
        }
    }

    displayEvent(event: Event)
    {
        if (this.eventForm) {
            this.eventForm.reset();
        }

        this.eventData = event;
        this.eventForm.patchValue({
            Id: this.eventData.Id,
            Title: this.eventData.Title,
            StartDate: new Date(this.eventData.StartDate),
            EndDate: new Date(this.eventData.EndDate),
            Role: this.eventData.Role,
            Description: this.eventData.Description
        });
    }

    SaveEvent()
    {
        if (this.eventForm.valid)
        {
            if (this.eventForm.dirty) {
                const _event = { ...this.event, ...this.eventForm.value };
                console.log(_event)
                if (_event.Id === 0 || _event.Id === '' || _event.Id === null) {
                    this.eventsService.createEvent(_event)
                        .subscribe({
                            next: () => {
                                this.notification.showSuccess("votre évènement a été bien  ajoutée"), this.initilizeAllEvents()
                            },
                            error: err => this.notification.showError('Veuillez saisir correctement les champs demandés.')
                        });
                } else {
                    this.eventsService.updateEvent(_event)
                        .subscribe({
                            next: () => { this.notification.showSuccess("votre évènement a été bien modifiée"), this.initilizeAllEvents() },
                            error: err => this.notification.showError('Veuillez saisir correctement les champs demandés.')
                        });
                }
            }
        }
        else
        {
            this.notification.showInfo('Veuillez saisir correctement les champs demandés.')
        }
        this.displayResponsive = false
    }

    refreshEventList()
    {
        this.calendarService.getExamensEvent().subscribe(exams => {
            this.examslist = exams.map((e: any) => {
                return { id: e.id, title: e.title, start: e.StartDate, end: e.EndDate, eventType: e.eventType, color: e.color };
            });
        });
        this.calendarService.getEvents().subscribe((eventsList) => {
            this.eventsList = eventsList.map((e: any) => {
                return { id: e.id, title: e.title, start: e.StartDate, end: e.EndDate, eventType: e.eventType, color: e.color };
            });
            this.InitializCalendar();
        });
    }

    async deleteItem(id: number)
    {
        if (this.eventType == "course")
        {
            this.displayResponsive = false
            if (await this.notification.deleteElementAlert())
            {
                this.eventsService.deleteEvent(id)
                    .subscribe({
                        next: () => { this.notification.showInfo("votre event  a été bien supprimée ") },
                        error: err => this.notification.showError(err.error.Message),
                        complete: () => {
                            this.initilizeAllEvents()
                        },
                    });
            }
        }
    }
}