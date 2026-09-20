import { useState, useRef, useEffect, useMemo } from "react";
import { gsap } from "gsap";
import { X, MapPin } from "lucide-react";
import ProjectCard from "./ProjectCard";
import Button from "./Button";
import { projects, projectCategories } from "../data/projects";
import "./ProjectGallery.css";

export default function ProjectGallery() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);
  const gridRef = useRef(null);
  const closeBtnRef = useRef(null);
  const lastFocusedRef = useRef(null);

  const filteredProjects = useMemo(
    () =>
      activeCategory === "All" ? projects : projects.filter((p) => p.category === activeCategory),
    [activeCategory]
  );

  useEffect(() => {
    if (!gridRef.current) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    gsap.fromTo(
      gridRef.current.children,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.55, stagger: 0.06, ease: "power2.out" }
    );
  }, [activeCategory]);

  const openProject = (project) => {
    lastFocusedRef.current = document.activeElement;
    setSelectedProject(project);
  };

  const closeProject = () => {
    setSelectedProject(null);
    lastFocusedRef.current?.focus();
  };

  useEffect(() => {
    if (!selectedProject) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") closeProject();
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    closeBtnRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedProject]);

  return (
    <div className="project-gallery">
      <div className="project-gallery__filters" role="tablist" aria-label="Filter projects by category">
        {projectCategories.map((cat) => (
          <button
            key={cat}
            role="tab"
            aria-selected={activeCategory === cat}
            className={`project-gallery__filter ${activeCategory === cat ? "is-active" : ""}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="project-gallery__grid" ref={gridRef}>
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} onView={() => openProject(project)} />
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <p className="project-gallery__empty">No projects in this category yet.</p>
      )}

      {selectedProject && (
        <div
          className="project-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
          onClick={(e) => e.target === e.currentTarget && closeProject()}
        >
          <div className="project-modal__panel">
            <button
              ref={closeBtnRef}
              className="project-modal__close"
              onClick={closeProject}
              aria-label="Close project details"
            >
              <X size={22} />
            </button>

            <div className="project-modal__media">
              <img src={selectedProject.image} alt="" />
            </div>

            <div className="project-modal__body">
              <span className="project-modal__category">{selectedProject.category}</span>
              <h3 id="project-modal-title">{selectedProject.title}</h3>
              {selectedProject.location && (
                <p className="project-modal__location">
                  <MapPin size={15} /> {selectedProject.location}
                </p>
              )}
              <p className="project-modal__desc">{selectedProject.description}</p>
              {selectedProject.isSample && (
                <p className="project-modal__sample-note">Sample project shown for illustration.</p>
              )}
              <Button to="/contact" variant="primary">
                Enquire About a Similar Project
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}