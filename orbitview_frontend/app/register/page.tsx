"use client";

import { useState, useEffect } from "react";
// import { useNavigation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Orbit } from "lucide-react";
import Link from "next/link";
import { BACKEND, ROUTES } from "@/lib/constants";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface FormData {
  email: string;
  username: string;
  password: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
}

const initialRegistrationEndpoint = "auth/users/"; // must be unauthenticated
const jwtCreateEndpoint = "auth/jwt/create/";
const updateMoreInfoEndpoint = "api/users/me/";

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [allFieldsReadOnly, setIsAllFieldsReadOnly] = useState(false);
  const [month, setMonth] = useState<string>("");
  const [day, setDay] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [dob, setDob] = useState<string>("");

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");

  const [error, setError] = useState<string>("");

  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    email: "",
    username: "",
    password: "",
    first_name: "",
    last_name: "",
    date_of_birth: "",
  });

  // const [startedAccountCreation, setStartedAccountCreation] = useState(false);

  const backend = BACKEND;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = () => {
    if (month && day && year) {
      const formattedDate = `${year}-${month}-${day
        .toString()
        .padStart(2, "0")}`;
      setDob(formattedDate); // Set the formatted date in state
      setFormData((prev) => ({
        ...prev,
        date_of_birth: formattedDate, // Update formData with the new date of birth
      }));
    }
  };

  useEffect(() => {
    handleDateChange();
  }, [month, day, year]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAllFieldsReadOnly(true);
    setIsLoading(true);
    // setStartedAccountCreation(true);

    const initialFormData = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
    };

    // console.log("Initial form data: " + initialFormData);

    try {
      // Step 1: Send registration details (email, password, username)
      const response = await fetch(
        `${backend}/${initialRegistrationEndpoint}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(initialFormData),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        setIsAllFieldsReadOnly(false);
        // Handle registration errors
        if (data.username === "A user with that username already exists.") {
          setError(
            `${formData.username} is already taken. Please choose another one.`
          );
        } else if (data.email === "user with this email already exists") {
          setError(
            `An account with email ${formData.email} already exists. Are you trying to log in?`
          );
        } else if (data.password) {
          setError(data.password[0]);
        } else {
          setError("Registration failed. Please try again.");
        }
        setIsLoading(false);
        return; // Exit if registration fails
      }

      const jwtFormData = {
        username: formData.username,
        password: formData.password,
      };

      console.log(jwtFormData);

      // Step 2: Send POST request to create JWT (authentication)
      const authResponse = await fetch(`${backend}/${jwtCreateEndpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jwtFormData),
      });

      if (!authResponse.ok) {
        const data = await authResponse.json();
        setError("Authentication failed. Please check your username/password.");
        setIsAllFieldsReadOnly(false);

        setIsLoading(false);
        return; // Exit if authentication fails
      }

      const authData = await authResponse.json();
      const accessToken = authData.access;

      // Step 3: Send PUT request to update first and last name
      const updateFormData = {
        first_name: firstName,
        last_name: lastName,
        date_of_birth: dob,
        bio: "", // I was today year's old when I realized an empty string != null
        website: "",
        profile_image: null,
      };

      console.log("Updating form data: " + updateFormData);

      const updateResponse = await fetch(
        `${backend}/${updateMoreInfoEndpoint}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${accessToken}`, // Pass token for authorization
          },
          body: JSON.stringify(updateFormData),
        }
      );

      if (!updateResponse.ok) {
        const data = await updateResponse.json();
        setError("Failed to update profile. Please try again later.");
        setIsAllFieldsReadOnly(false);
        setIsLoading(false);
        return; // Exit if updating name fails
      }

      // Step 4: Store the access token in localStorage

      localStorage.setItem("orbitview_access_token", accessToken);
      toast.success("Account created successfully!");
      router.push("/"); // This redirects without full page reload
      // Continue after all steps succeed (e.g., navigate to another page or show a success message)
      setIsLoading(false);
      // Optionally, redirect the user or show success message
    } catch (error) {
      setError("Something went wrong. Please try again.");
      setIsAllFieldsReadOnly(false);
      setIsLoading(false);
    }
  };

  // Generate arrays for days, months, and years
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = [
    { value: "01", label: "January" },
    { value: "02", label: "February" },
    { value: "03", label: "March" },
    { value: "04", label: "April" },
    { value: "05", label: "May" },
    { value: "06", label: "June" },
    { value: "07", label: "July" },
    { value: "08", label: "August" },
    { value: "09", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ];
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-muted/30">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          {/*<Link href={ROUTES.HOME} className="flex items-center space-x-2 mb-6">
            <Orbit className="h-12 w-12" />
            <span className="text-3xl font-bold">{APP_NAME}</span>
          </Link>*/}
          <h2 className="text-2xl font-bold text-center">
            Create your account
          </h2>
          <p className="mt-2 text-muted-foreground text-center">
            Accelerate your future before it's too late...
          </p>
        </div>

        <Card>
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardDescription className="text-center">
                Already have an account?{" "}
                <Link
                  href={ROUTES.LOGIN}
                  className="text-primary hover:underline font-medium"
                >
                  Sign in
                </Link>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    name="first_name"
                    type="text"
                    placeholder="John"
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    disabled={isLoading}
                    readOnly={allFieldsReadOnly}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    name="last_name"
                    type="text"
                    placeholder="Doe"
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    disabled={isLoading}
                    readOnly={allFieldsReadOnly}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    placeholder="e.g. JohnDoe123"
                    onChange={handleInputChange}
                    required
                    disabled={isLoading}
                    readOnly={allFieldsReadOnly}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="john@example.com"
                  onChange={handleInputChange}
                  required
                  disabled={isLoading}
                  readOnly={allFieldsReadOnly}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password" // Add name attribute
                  type="password"
                  placeholder="********"
                  onChange={handleInputChange}
                  required
                  disabled={isLoading}
                  readOnly={allFieldsReadOnly}
                />
              </div>
              <div className="space-y-2">
                <Label>Date of Birth</Label>
                <div className="grid grid-cols-3 gap-2">
                  <Select
                    value={month}
                    onValueChange={setMonth}
                    disabled={allFieldsReadOnly}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Month" />
                    </SelectTrigger>
                    <SelectContent>
                      {months.map((month) => (
                        <SelectItem key={month.value} value={month.value}>
                          {month.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select
                    value={day}
                    onValueChange={setDay}
                    disabled={allFieldsReadOnly}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Day" />
                    </SelectTrigger>
                    <SelectContent>
                      {days.map((day) => (
                        <SelectItem key={day} value={day.toString()}>
                          {day}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select
                    value={year}
                    onValueChange={setYear}
                    disabled={allFieldsReadOnly}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Year" />
                    </SelectTrigger>
                    <SelectContent>
                      {years.map((year) => (
                        <SelectItem key={year} value={year.toString()}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Creating account..." : "Create account"}
              </Button>
              {error ? (
                <>
                  <p style={{ color: "red" }}>{error}</p>
                </>
              ) : (
                <></>
              )}
              <p className="text-xs text-center text-muted-foreground px-6">
                By clicking "Create account", you agree to our{" "}
                <Link
                  href={ROUTES.TERMS}
                  className="underline hover:text-foreground"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href={ROUTES.PRIVACY}
                  className="underline hover:text-foreground"
                >
                  Privacy Policy
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
