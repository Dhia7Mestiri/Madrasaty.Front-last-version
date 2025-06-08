import { ActivatedRoute } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as consts from '@consts/url.consts';
import { HttpService } from '@services/http-service/http.service';

@Component({
    selector: '[app-member-details]',
    templateUrl: './member-details.component.html',
    styleUrls: ['./member-details.component.scss']
})
export class MemberDetailsComponent implements OnInit, OnDestroy {
    currentmember: any;
    src: string;
    value: number;
    contries: any[];
    genders = [{ isFemale: false, name: 'Masculin' }, { isFemale: true, name: 'Féminin' }];
    private destroy$ = new Subject();

    constructor(private route: ActivatedRoute, private http: HttpService) {}

    ngOnInit() {
        this.http.read("assets/files/countries.json",false)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data) => {
            this.contries = data;
        });

        this.route.params
            .pipe(takeUntil(this.destroy$))
            .subscribe(params => {
                const memberId = params['Id'];        
                    this.http.read(consts.API_URL + "Members/" + memberId, false)
                    .pipe(takeUntil(this.destroy$))
                    .subscribe((data) => {
                       data.Country=this.getCountryName(data.Country)
                       data.Female=this.getGenderName(Boolean(data.Female))
                        this.currentmember = data;
                        const formValue = { ...this.currentmember };
                        const progress = Object.keys(formValue).length;
                        this.value = Math.floor(progress * 4.1);
                        if (this.value >= 250) {
                            this.value = 100;
                        }
                        this.src = "";
                    });
            });
 
    }

    getCountryName(code: string) {
        return this.contries?.find(x => x.code === code)?.name;
    }

    getGenderName(isFemale: boolean) {
        return this.genders?.find(x => x.isFemale === isFemale)?.name;
    }
    
    ngOnDestroy() {   
        this.destroy$.complete();
    }
}