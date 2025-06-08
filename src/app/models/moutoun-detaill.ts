import { RecitationSessionModel } from './recitation-session-model';
import { Member                 } from './member';

export class MoutounDetail
{
    Id: number;
    RecitationId: number;
    RecitationSession: RecitationSessionModel;
    StudentId: number;
    Student: Member;
    Poeme: number;
    VerseDebut: number;
    VerseFin: number;
    Rating: number;
    Remarques: string;
    DateEvaluation:Date;
}