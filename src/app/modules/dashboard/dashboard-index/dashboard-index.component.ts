import { Component, OnInit, ViewChild } from '@angular/core';

// import { ApexAxisChartSeries, ApexChart,
//          ApexDataLabels, ApexNonAxisChartSeries,
//          ApexResponsive, ApexStroke, ApexTooltip,
//          ApexXAxis, ChartComponent } from 'ng-apexcharts';
import { CalendarOptions           } from '@fullcalendar/angular';
import { TranslateService          } from '@ngx-translate/core';

import { CalendarService     } from '@services/calendar/calendar.service';
import { Member              } from '@models/member';
import { MembersListService  } from '@services/members/members-list.service';
import { UserService         } from '@services/user.service';
import { NotificationService } from '@services/notification.service';
import { getCurrentUser      } from '@functions/current-user';
import { Permission          } from '@enums/permission';

// import { getCSSVariableValue } from 'src/app/_metronic/kt/_utils';

import frLocale from '@fullcalendar/core/locales/fr'; 

import * as consts from '@consts/global.consts';

@Component({
    selector   : 'app-dashboard-index',
    templateUrl: './dashboard-index.component.html',
    styleUrls  : ['./dashboard-index.component.scss'],
})
export class DashboardIndexComponent implements OnInit
{
    pageTitle = consts.appTitle;
    captions !: any[];

    canViewStatsAdmin   = Permission.ViewStatsAdmin;
    canViewStatsTeacher = Permission.ViewStatsTeacher;
    canViewStatsStudent = Permission.ViewStatsStudent;
    currentMemberStatus: number;
    //@ViewChild("chart") chart: ChartComponent;
    // public chartOptions: Partial<ChartOptions>;
    // public chartOptions3: Partial<ChartOptions3>;
    public chartOptions2: any;
    chartColor = "primary"
    chartHeight = "175px"
    selected
    parentchild
    currentMemberId: number;
    genders = [{ id: 'M', name: 'Masculin' }, { id: 'F', name: 'Féminin' }];
    status = [{ id: 1, name: 'Administrateur' }, { id: 2, name: 'Enseignant actif' }, { id: 3, name: 'Enseignant non actif' }, { id: 4, name: 'Étudiant actif' }, { id: 5, name: 'Étudiant non actif' }, { id: 6, name: 'Nouvelle inscription' }, { id: 7, name: 'Parent' }];
    ConnectedUser: Member
    teacher
    student
    parent
    male: number
    female: number
    rowData: Member[] = [];
    Courslist = [];
    examslist = [];
    eventlist = []
    Holidaylist = []
    calendarOptions: CalendarOptions;

    activeTab: Tabs = 'kt_table_widget_6_tab_1';

    data: any;

    constructor(private calendarService: CalendarService, private userService: UserService,
        private memberList: MembersListService, private notif: NotificationService,
        private translate: TranslateService)
    { }

    ngOnInit()
    {
        this.initilizeAllEvents();

   /*      this.memberList.getMembers(0, null, null).subscribe((response) =>
        {
            this.rowData = response;
            var specefiqueMember = response.filter(x => x.ParentEmail == "parent1@gmail.com")
            this.parentchild = specefiqueMember
            console.log(this.parentchild)
            this.teacher = response.filter(x => x.MemberStatusId == 2 || x.MemberStatusId == 3)
            this.student = response.filter(x => x.MemberStatusId == 4 || x.MemberStatusId == 5)
            this.parent = response.filter(x => x.MemberStatusId == 7)
            this.female = this.student.filter(x => x.Gender == "F").length
            this.male = this.student.filter(x => x.Gender == "M").length
            this.data = {
                labels: ["étudiantes", "étudiants"],
                datasets: [
                    {
                        data: [this.female, this.male],
                        backgroundColor: [
                            "#FF6384",
                            "#36A2EB",

                        ],
                        hoverBackgroundColor: [
                            "#FF6384",
                            "#36A2EB",

                        ]
                    }
                ]
            };
        }) */

        // this.chartOptions3 = {
        //     series: [1, 2],
        //     chart: {
        //         type: "donut"
        //     },
        //     labels: ["Female Students", "Male Students"],
        //     responsive: [
        //         {
        //             breakpoint: 480,
        //             options: {
        //                 chart: {
        //                     width: 200
        //                 },
        //                 legend: {
        //                     position: "bottom"
        //                 }
        //             }
        //         }
        //     ]
        // };

        // this.chartOptions = {
        //     series: [
        //         {
        //             name: "Total Collections",
        //             data: [31, 40, 28, 51, 42, 109, 100]
        //         },
        //         {
        //             name: "Fees Collection",
        //             data: [11, 32, 45, 32, 34, 52, 41]
        //         }
        //     ],
        //     chart: {
        //         height: 350,
        //         type: "area"
        //     },
        //     dataLabels: {
        //         enabled: false
        //     },
        //     stroke: {
        //         curve: "smooth"
        //     },
        //     xaxis: {
        //         type: "datetime",
        //         categories: [
        //             "2018-09-19T00:00:00.000Z",
        //             "2018-09-19T01:30:00.000Z",
        //             "2018-09-19T02:30:00.000Z",
        //             "2018-09-19T03:30:00.000Z",
        //             "2018-09-19T04:30:00.000Z",
        //             "2018-09-19T05:30:00.000Z",
        //             "2018-09-19T06:30:00.000Z"
        //         ]
        //     },
        //     tooltip: {
        //         x: {
        //             format: "dd/MM/yy HH:mm"
        //         }
        //     }
        // };


        const user           = getCurrentUser();
        this.currentMemberId = user?.id ?? 0;  // user ? JSON.parse(user['user']).Id : 0;

        this.currentMemberStatus = Permission.ViewStatsAdmin;  // 1;  // this.userService.getMemberStatutId();
        this.chartOptions2       = getChartOptions(this.chartHeight, this.chartColor);

        this.getMember();
        //this.chartOptions3.series  = [this.female, this.male];
    }

    getCaptions()
    {
        this.translate.get([
            "general.title", "dashboard-index.statistiques"
        ]).subscribe((values: any[]) =>
        {
            this.captions  = values;
            this.pageTitle = values["general.title"];

            this.setPageTitle();
        });
    }

    setPageTitle()
    {
        this.notif.updatePageTitle({
            title     : this.pageTitle,
            breadcrumb: [],
            actionsBtn: [
                {
                    text       : this.captions['dashboard-index.statistiques'],
                    url        : '/stats',
                    modalTarget: '',
                    cssClass   : 'fw-bold btn-primary'
                },
            ]
        });
    }

    setTab(tab: Tabs)
    {
        this.activeTab = tab;
    }

    activeClass(tab: Tabs)
    {
        return tab === this.activeTab ? 'show active' : '';
    }

    getvalue(id)
    {
        return this.genders.find(x => x.id == id).name
    }

    getStatus(id)
    {
        return this.status.find(x => x.id == id).name
    }

    getMember()
    {
        this.memberList.getMember(this.currentMemberId)
            .subscribe(data => {
                this.ConnectedUser = data;
            });
    }

    initilizeAllEvents()
    {
        this.calendarService.getHolidaysEvent().subscribe(holidays => {

            this.Holidaylist = holidays.map((e: any) => {

                return { id: e.id, title: e.title, start: e.StartDay, end: e.EndDay, eventType: e.eventType, color: e.color };
            });
            this.InitializeCalendar()
        })

        this.calendarService.getCoursEvent().subscribe(Cours => {
            this.Courslist = Cours.map((e: any) => {
                return { id: e.id, title: e.title, start: e.start, end: e.end, eventType: e.eventType, color: e.color };
            });

            this.InitializeCalendar()
        })


        this.calendarService.getExamensEvent().subscribe(exams => {
            this.examslist = exams.map((e: any) => {

                return { id: e.id, title: e.title, start: e.StartDate, end: e.EndDate, eventType: e.eventType, color: e.color };
            });
            this.InitializeCalendar()
        });

        try {
            this.calendarService.getEvents().subscribe((eventsList) => {
                this.eventlist = eventsList.map((e: any) => {
                    return { id: e.id, title: e.title, start: e.StartDate, end: e.EndDate, eventType: e.eventType, color: e.color };
                });
    
    
                this.InitializeCalendar();
            });
        } catch (error) {
            //
        }
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

    InitializeCalendar()
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

            events: this.Holidaylist.concat(this.eventlist, this.examslist, this.Courslist),
            eventDidMount: this.showToolTip.bind(this),
        };
    }
}

type Tabs =
    | 'kt_table_widget_6_tab_1'
    | 'kt_table_widget_6_tab_2'
    | 'kt_table_widget_6_tab_3';

// export type ChartOptions = {
//     series: ApexAxisChartSeries;
//     chart: ApexChart;
//     xaxis: ApexXAxis;
//     stroke: ApexStroke;
//     tooltip: ApexTooltip;
//     dataLabels: ApexDataLabels;
// };
// export type ChartOptions3 = {
//     series: ApexNonAxisChartSeries;
//     chart: ApexChart;
//     responsive: ApexResponsive[];
//     labels: any;
// };
function getChartOptions(chartHeight: string, chartColor: string)
{
    const labelColor     = "#ff0000";  // getCSSVariableValue('--bs-gray-500');
    const borderColor    = "#ff0000";  // getCSSVariableValue('--bs-gray-200');
    const secondaryColor = "#ff0000";  // getCSSVariableValue('--bs-gray-300');
    const baseColor      = "#ff0000";  // getCSSVariableValue('--bs-' + chartColor);

    return {
        series: [
            {
                name: 'Net Profit',
                data: [50, 60, 70, 80, 60, 50, 70, 60],
            },
            {
                name: 'Revenue',
                data: [50, 60, 70, 80, 60, 50, 70, 60],
            },
        ],
        chart: {
            fontFamily: 'inherit',
            type: 'bar',
            height: chartHeight,
            toolbar: {
                show: false,
            },
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '50%',
                borderRadius: 5,
            },
        },
        legend: {
            show: false,
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            show: true,
            width: 2,
            colors: ['transparent'],
        },
        xaxis: {
            categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false,
            },
            labels: {
                style: {
                    colors: labelColor,
                    fontSize: '12px',
                },
            },
        },
        yaxis: {
            labels: {
                style: {
                    colors: labelColor,
                    fontSize: '12px',
                },
            },
        },
        fill: {
            type: 'solid',
        },
        states: {
            normal: {
                filter: {
                    type: 'none',
                    value: 0,
                },
            },
            hover: {
                filter: {
                    type: 'none',
                    value: 0,
                },
            },
            active: {
                allowMultipleDataPointsSelection: false,
                filter: {
                    type: 'none',
                    value: 0,
                },
            },
        },
        tooltip: {
            style: {
                fontSize: '12px',
            },
            y: {
                formatter: function (val: number) {
                    return '$' + val + ' revenue';
                },
            },
        },
        colors: [baseColor, secondaryColor],
        grid: {
            padding: {
                top: 10,
            },
            borderColor: borderColor,
            strokeDashArray: 4,
            yaxis: {
                lines: {
                    show: true,
                },
            },
        },
    };
}