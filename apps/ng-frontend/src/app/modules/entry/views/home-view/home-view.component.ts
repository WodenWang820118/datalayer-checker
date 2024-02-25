import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from '../../../../shared/components/toolbar/toolbar.component';
import { ProjectListComponent } from '../../components/project-list/project-list.component';
import { ProjectService } from '../../../../shared/services/api/project/project.service';
import { Observable } from 'rxjs';
import { Project } from '../../../../shared/models/project.interface';

@Component({
  selector: 'app-home-view',
  standalone: true,
  imports: [CommonModule, ToolbarComponent, ProjectListComponent],
  template: `
    <div class="home">
      <div class="home__projects">
        <app-project-list [projects]="projects$"></app-project-list>
      </div>
    </div>
  `,
  styles: `
    .home {
    &__projects {
      padding: 2rem 10rem;
    }
  }
  `,
})
export class HomeViewComponent {
  projects$: Observable<Project[]>;
  constructor(private projectService: ProjectService) {
    this.projects$ = this.projectService.getProjects();
  }
}