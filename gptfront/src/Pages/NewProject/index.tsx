import React, { useState, useRef } from "react";
import "./index.css";
import InputComponent from "../../components/Inputs";
import { VariableStatement } from "typescript";
import { type } from "os";

type Inputs = {
  Goal: string;
  Instruction: string;
  ChiefComplaint: string;
  T2DMDuration: string;
  PatientAge: number | undefined;
  PatientSex: string;
  BriefHPI: string;
  PastMedicalHistory: string;
  ReviewofSymptoms: string | undefined;
  PhysicalExam: string | undefined;
  DiagnosticTesting: string | undefined;
  CurrentHbA1c: string | undefined;
  FastingBloodGlucose: string | undefined;
  PrandialBloodGlucose: number | undefined;
  LifestyleConsiderations: string;
  Treatment: string;
  OutPutRules: string;
};

type inputElements = {
  name: string;
  placeHolder: string;
  value: string | number | undefined;
  type: string;
};

const NewProject = () => {
  //Search to get a data
  const [search, setSearch] = useState<string | undefined>();
  //Response from the GPT is here
  const [response, setResponse] = useState<string>("");
  // Save stuff should be here
  const [data, setData] = useState<Inputs>({
    Goal: "Create a clinical case vignette about a patient with T2DM who is not attaining glycemic targets with oral antidiabetic drugs and basal insulin.",
    Instruction:
      "-Use real-life patient scenarios: The case vignette should be based on a real-life patient scenario and should be as authentic as possible. Include: patient demographics, psychosocial history, and follow-up \n -Keep it relevant: The case vignette should be relevant to the learners' field of study and should align with their curriculum.\n – Make it challenging: The case vignette should be challenging enough to engage the learners and encourage them to think critically. \n – Include all relevant information: The case vignette should include all relevant information about the patient, such as their history, physical examination findings, psychosocial history, and laboratory results. \n – Be concise: The case vignette should be concise and should only include the most essential information \n – Always use units when reporting clinical measurements (ie, physical exam parameters like BMI, blood pressure, as well as laboratory values like HbA1c, etc.). For example, BMI should always be followed by kg/m2",
    ChiefComplaint: "",
    T2DMDuration: "",
    PatientAge: undefined,
    PatientSex: "",
    BriefHPI: "",
    PastMedicalHistory: "",
    ReviewofSymptoms: "",
    PhysicalExam: "",
    DiagnosticTesting: "",
    CurrentHbA1c: undefined,
    FastingBloodGlucose: undefined,
    PrandialBloodGlucose: undefined,
    LifestyleConsiderations: "",
    Treatment: "",
    OutPutRules:
      "– BRIEF HISTORY OF PRESENT ILLNESS: If this INPUT PARAMETER is empty, come up with a realistic brief history of present illness in the OUTPUT.\n – PAST MEDICAL HISTORY: If this INPUT PARAMETER is empty, come up with relevant comorbidities which affect the primary disease. Always include disease duration for each item. \n – PHYSICAL EXAM: If this INPUT PARAMETER is empty, come up with a realistic physical exam in the OUTPUT. Always include the BMI, fundoscopic exam, and a foot exam in the OUTPUT. \n– LAST FASTING BLOOD GLUCOSE: If this INPUT PARAMETER is empty, come up with a realistic fasting blood glucose measurement in the OUTPUT \n – LAST PRANDIAL BLOOD GLUCOSE: If this INPUT PARAMETER is empty, come up with a realistic prandial blood glucose measurement in the OUTPUT \n – TREATMENT: RULE 1: If this INPUT PARAMETER is empty, come up with a realistic prandial blood glucose measurement in the OUTPUT. RULE 2: Always include dosages in the output and always place the dosages right after the drug name [ie, Metformin 1,000 mg/day]. RULE 3: If drug(s) are entered without dosages, you need to come up with realistic dosages. – DO NOT include anything else in your OUTPUT besides the case vignette – DO NOT include the INPUT PARAMETERS or the INPUT PARAMETER STRUCTURE FROM ABOVE",
  });

  // Errors should be there
  const [dataError, setDataError] = useState({
    ChiefComplaintError: "",
    T2DMDurationError: "",
    PatientAgeError: "",
    PatientSexError: "",
    BriefHPIError: "",
    PastMedicalHistoryError: "",
    ReviewofSymptomsError: "",
    PhysicalExamError: "",
    DiagnosticTestingError: "",
    CurrentHbA1cError: "",
    FastingBloodGlucoseError: "",
    PrandialBloodGlucoseError: "",
    LifestyleConsiderationsError: "",
    TreatmentError: "",
  });

  // For now it's a sample of what I will get from the DB
  const [inputElements, setInputElements] = useState<inputElements[]>([
    {
      name: "ChiefComplaint",
      placeHolder: "ChiefComplaint",
      value: data.ChiefComplaint,
      type: "textarea",
    },
    {
      name: "T2DMDuration",
      placeHolder: "T2DM Duration",
      value: data.T2DMDuration,
      type: "textarea",
    },
    {
      name: "PatientAge",
      placeHolder: "Patient Age",
      value: data.PatientAge,
      type: "input",
    },
    {
      name: "PatientSex",
      placeHolder: "Patient Sex",
      value: data.PatientSex,
      type: "textarea",
    },
    {
      name: "BriefHPI",
      placeHolder: "Brief HPI",
      value: data.BriefHPI,
      type: "textarea",
    },
    {
      name: "PastMedicalHistory",
      placeHolder: "Past Medical History",
      value: data.PastMedicalHistory,
      type: "textarea",
    },
    {
      name: "ReviewofSymptoms",
      placeHolder: "Review of Symptoms",
      value: data.ReviewofSymptoms,
      type: "textarea",
    },
    {
      name: "PhysicalExam",
      placeHolder: "Physical Exam",
      value: data.PhysicalExam,
      type: "textarea",
    },
    {
      name: "DiagnosticTesting",
      placeHolder: "Diagnostic Testing",
      value: data.DiagnosticTesting,
      type: "textarea",
    },
    {
      name: "CurrentHbA1c",
      placeHolder: "Current HbA1c",
      value: data.CurrentHbA1c,
      type: "textarea",
    },
    {
      name: "FastingBloodGlucose",
      placeHolder: "Fasting Blood Glucose",
      value: data.FastingBloodGlucose,
      type: "textarea",
    },
    {
      name: "PrandialBloodGlucose",
      placeHolder: "Prandial Blood Glucose",
      value: data.PrandialBloodGlucose,
      type: "input",
    },
    {
      name: "LifestyleConsiderations",
      placeHolder: "Lifestyle Considerations",
      value: data.LifestyleConsiderations,
      type: "textarea",
    },
    {
      name: "Treatment",
      placeHolder: "Treatment",
      value: data.Treatment,
      type: "textarea",
    },
  ]);

  // input Change handle function
  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === "number") {
      setData((prevState) => ({
        ...prevState,
        [name]: Number(value.toString().replace(/[^0-9]/g, "")),
      }));
    } else {
      setData((prevState) => ({
        ...prevState,
        [name]: value.replace(/\n|\r/g, "").trim(),
      }));
    }
  };

  // form Submit handle function
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //console.log(model);
    fetch("http://localhost:3001/medicine", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setResponse(res.message);
      });
  };

  return (
    <>
      <div className="input_container">
        <input
          type="text"
          placeholder="search"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <form className="form" onSubmit={handleSubmit}>
          <InputComponent inputInfo={inputElements} handleChange={handleChange}></InputComponent>
          <button type="submit">Submit</button>
        </form>

        <p>
          {response.split("\n").map((t, key) => {
            return (
              <span key={key}>
                {t} <br />
              </span>
            );
          })}
        </p>

        {/*  <p>
          {JSON.stringify(data)
            .split('",')
            .map((t, key) => {
              return (
                <span key={key}>
                  {t} <br></br>
                </span>
              );
            })}
        </p>
          */}
      </div>
    </>
  );
};

export default NewProject;
