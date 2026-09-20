import { MapPin } from "lucide-react";
import "./ProjectCard.css";

export default function ProjectCard({ project, onView }) {
  return (
    <article className="project-card">
      <button
        type="button"
        className="project-card__media hover-zoom"
        onClick={() => onView(project)}
        aria-label={`View details for ${project.title}`}
      >
        <img src={project.image} alt="" />
        <span className="project-card__category">{project.category}</span>
      </button>

      <div className="project-card__body">
        <h3 className="project-card__title">{project.title}</h3>
        {project.location && (
          <p className="project-card__location">
            <MapPin size={14} /> {project.location}
          </p>
        )}
        <p className="project-card__desc">{project.description}</p>
        <button type="button" className="btn--ghost project-card__cta" onClick={() => onView(project)}>
          View Project
        </button>
      </div>
    </article>
  );
}