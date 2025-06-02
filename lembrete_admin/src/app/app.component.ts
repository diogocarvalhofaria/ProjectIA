import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from './services/api.service';
import { Reminder } from '../generated/graphql';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.8)' }),
        animate('200ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ opacity: 0, transform: 'scale(0.8)' }))
      ])
    ])
  ],
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  lembretes: Reminder[] = [];
  lembreteForm!: FormGroup;
  showForm = false;
  isEditMode = false;
  currentLembreteId: string | null = null;
  isLoading = false;

  showDeleteModal = false;
  lembreteToDelete: Reminder | null = null;

  constructor(
    private apiService: ApiService,
    private fb: FormBuilder
  ) {
    this.lembreteForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      date: ['', [Validators.required]],
      active: [true]
    });
  }

  ngOnInit() {
    this.loadLembretes();

    // Inscreva-se no observable de carregamento para atualizar o estado de isLoading
    this.apiService.isLoadingReminders$.subscribe(isLoading => {
      this.isLoading = isLoading;
    });

    // Inscreva-se nas atualizações da lista de lembretes
    this.apiService.reminders$.subscribe(reminders => {
      this.lembretes = reminders;
    });
  }

  loadLembretes() {
    this.apiService.getAllReminders().subscribe({
      error: (err) => console.error('Erro ao carregar lembretes:', err)
    });
  }

  openForm() {
    this.isEditMode = false;
    this.currentLembreteId = null;
    this.lembreteForm.reset({ active: true });
    this.showForm = true;
  }

  editLembrete(lembrete: Reminder) {
    this.isEditMode = true;
    this.currentLembreteId = lembrete.id;
    const dateStr = new Date(lembrete.date).toISOString().slice(0, 16);

    this.lembreteForm.setValue({
      title: lembrete.title,
      description: lembrete.description,
      date: dateStr,
      active: lembrete.active
    });

    this.showForm = true;
  }

  cancelForm() {
    this.showForm = false;
  }

  saveLembrete() {
    if (this.lembreteForm.invalid) return;

    const lembreteData = {
      ...this.lembreteForm.value,
      date: new Date(this.lembreteForm.value.date).toISOString()
    };

    if (this.isEditMode && this.currentLembreteId) {
      this.apiService.updateReminder(this.currentLembreteId, lembreteData).subscribe({
        next: () => {
          this.showForm = false;
        },
        error: (err) => console.error('Erro ao atualizar lembrete:', err)
      });
    } else {
      this.apiService.createReminder(lembreteData).subscribe({
        next: () => {
          this.showForm = false;
        },
        error: (err) => console.error('Erro ao criar lembrete:', err)
      });
    }
  }

  deleteLembrete(lembre: Reminder) {
    this.lembreteToDelete = lembre;
    this.showDeleteModal = true;
    }
  confirmDelete() {
    if (this.lembreteToDelete) {
      this.apiService.deleteReminder(this.lembreteToDelete.id).subscribe({
        next: () => {
          this.showDeleteModal = false;
          this.lembreteToDelete = null;
        },
        error: (err) => console.error('Erro ao excluir lembrete:', err)
      });
    }
  }
  cancelDelete() {
    this.showDeleteModal = false;
    this.lembreteToDelete = null;
  }

}
