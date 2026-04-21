package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"os"
	"path/filepath"
)

const projectsFolder = "projects"

type Project struct {
	ID          string `json:"id"`
	Name        string `json:"name"`
	Description string `json:"description"`
	CreatedAt   string `json:"createdAt"`
	UpdatedAt   string `json:"updatedAt"`
}

type App struct {
	ctx context.Context
}

func ensureProjectsFolder() error {
	if _, err := os.Stat(projectsFolder); os.IsNotExist(err) {
		return os.MkdirAll(projectsFolder, 0755)
	}
	return nil
}

func projectFilePath(id string) string {
	return filepath.Join(projectsFolder, id+".json")
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

// Greet returns a greeting for the given name
func (a *App) Greet(name string) string {
	return fmt.Sprintf("Hello %s, It's show time!", name)
}

func (a *App) HelloWorld() {
	log.Println("Hell World!!!")
}

func (a *App) CreateProject(project Project) error {
	if err := ensureProjectsFolder(); err != nil {
		return err
	}
	data, err := json.MarshalIndent(project, "", "  ")
	if err != nil {
		return err
	}
	return os.WriteFile(projectFilePath(project.ID), data, 0644)
}

func (a *App) ReadProject(id string) (Project, error) {
	log.Printf("ReadProject called with id: %s", id)
	data, err := os.ReadFile(projectFilePath(id))
	if err != nil {
		log.Printf("ReadFile error: %v", err)
		return Project{}, err
	}
	var project Project
	err = json.Unmarshal(data, &project)
	if err != nil {
		log.Printf("Unmarshal error: %v", err)
	}
	log.Printf("ReadProject result: %+v", project)
	return project, err
}

func (a *App) UpdateProject(project Project) error {
	data, err := json.MarshalIndent(project, "", "  ")
	if err != nil {
		return err
	}
	return os.WriteFile(projectFilePath(project.ID), data, 0644)
}

func (a *App) DeleteProject(id string) error {
	return os.Remove(projectFilePath(id))
}

func (a *App) ListProjects() ([]Project, error) {
	log.Println("ListProjects called")
	if err := ensureProjectsFolder(); err != nil {
		log.Printf("ensureProjectsFolder error: %v", err)
		return nil, err
	}
	entries, err := os.ReadDir(projectsFolder)
	if err != nil {
		log.Printf("ReadDir error: %v", err)
		return nil, err
	}
	log.Printf("Found %d entries in projects folder", len(entries))
	var projects []Project
	for _, entry := range entries {
		if filepath.Ext(entry.Name()) != ".json" {
			continue
		}
		id := entry.Name()[:len(entry.Name())-5]
		log.Printf("Reading project: %s", id)
		project, err := a.ReadProject(id)
		if err != nil {
			log.Printf("ReadProject error for %s: %v", id, err)
			continue
		}
		projects = append(projects, project)
	}
	log.Printf("Returning %d projects", len(projects))
	return projects, nil
}

func (a *App) ProjectExists(id string) bool {
	_, err := os.Stat(projectFilePath(id))
	return err == nil
}
