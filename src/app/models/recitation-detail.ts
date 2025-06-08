import { RecitationSessionModel } from './recitation-session-model';
import { Member                 } from './member';

export class RecitationDetail
{
    Id: number;
    SeanceId: number;
    RecitationSession?: RecitationSessionModel;
    StudentId: number;
    Student: Member;
    Surah: number;
    VerseDebut: number;
    VerseFin: number;
    Rating: number;
    Remarques: string;
    DateEvaluation: Date;
}