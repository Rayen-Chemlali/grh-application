import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom';
import axios from "axios";
import AddProfile from "./AddProfile";
import { BrowserRouter as Router } from "react-router-dom"; 

jest.mock("axios");

describe("AddProfile", () => {
  const mockEmployees = [
    { id: 1, username: "Manager1" },
    { id: 2, username: "Manager2" },
  ];

  beforeEach(() => {
    axios.get.mockResolvedValueOnce({ data: mockEmployees });
  });

  test("renders AddProfile component", async () => {
    render(
      <Router>
        <AddProfile />
      </Router>
    );

    expect(screen.getByText("Add New Profile")).toBeInTheDocument();
    expect(screen.getByText("Fill in the details below")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByRole("option", { name: "Manager1" })).toBeInTheDocument();
      expect(screen.getByRole("option", { name: "Manager2" })).toBeInTheDocument();
    });
  });

  test("selects an employee and fetches profile data", async () => {
    const mockProfile = {
      nom: "Doe",
      prenom: "John",
      pole: "Engineering",
      domaine: "Software",
      metier: "Developer",
      filiere: "IT",
      lieuDeTravail: "Paris",
      responsable: "Manager1",
      email: "john.doe@example.com",
      civilite: "Mr.",
      sexe: "Man",
      nationalite: "French",
      dateNaissance: "1990-01-01",
      lieuNaissance: "Paris",
      adresseDomicile: "123 Main St",
      image: null,
    };

    axios.get.mockResolvedValueOnce({ data: { profile: mockProfile } });

    render(
      <Router>
        <AddProfile />
      </Router>
    );

    fireEvent.change(screen.getByRole("combobox", { name: "" }), {
      target: { value: "1" },
    });

    await waitFor(() => {
      expect(screen.getByDisplayValue("Doe")).toBeInTheDocument();
      expect(screen.getByDisplayValue("John")).toBeInTheDocument();
      expect(screen.getByDisplayValue("Engineering")).toBeInTheDocument();
    });
  });

  test("submits the form", async () => {
    axios.post.mockResolvedValueOnce({ data: { message: "Profile created successfully!" } });

    render(
      <Router>
        <AddProfile />
      </Router>
    );

    fireEvent.change(screen.getByPlaceholderText("Nom"), { target: { value: "Doe" } });
    fireEvent.change(screen.getByPlaceholderText("Prenom"), { target: { value: "John" } });
    fireEvent.change(screen.getByPlaceholderText("Pole"), { target: { value: "Engineering" } });

    fireEvent.click(screen.getByText("Add Profile"));

    await waitFor(() => {
      fireEvent.click(screen.getByText("Submit"));
    });

    await waitFor(() => {
      expect(screen.getByText("Profile created successfully!")).toBeInTheDocument();
    });
  });
});
