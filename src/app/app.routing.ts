import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { NoteComponent } from './components/note/note.component';
import { ShareNoteComponent } from './components/share-note/share-note.component';

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'note', component: NoteComponent },
    { path: 'note/:noteId/share', component: ShareNoteComponent },

    // otherwise redirect to login
    { path: '**', redirectTo: 'login' }
];

export const appRoutingModule = RouterModule.forRoot(routes);