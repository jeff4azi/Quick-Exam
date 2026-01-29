import { edu101Questions } from "./courses/edu-101questions";
import { gns113Questions } from "./courses/gns-113questions";
import { gst111Questions } from "./courses/gst-111questions";
import { csc111Questions } from "./courses/csc-111questions";
import { vos116Questions } from "./courses/vos-116questions";
import { vos117Questions } from "./courses/vos-117questions";
import { cos101Questions } from "./courses/cos-101questions";
import { math101Questions } from "./courses/math-101questions";
import { edu101revisionQuestions } from "./courses/edu101revisionQuestions";

const courses = [
  {
    id: "EDU101",
    name: "EDU 101",
    group: "general", // general | departmental | vocational
    colleges: "all",
    questions: [...edu101Questions, ...edu101revisionQuestions],
  },
  {
    id: "GST111",
    name: "GST 111",
    group: "general",
    colleges: "all",
    questions: gst111Questions,
  },
  {
    id: "GNS113",
    name: "GNS 113",
    group: "general",
    colleges: "all",
    questions: gns113Questions,
  },
  {
    id: "CSC111",
    name: "CSC 111",
    group: "departmental",
    colleges: ["COL_SCI"], // scalable
    questions: csc111Questions,
  },
  {
    id: "COS101",
    name: "COS 101",
    group: "departmental",
    colleges: ["COL_SCI"], // scalable
    questions: cos101Questions,
  },
  {
    id: "MTH101",
    name: "MTH 101",
    group: "departmental",
    colleges: ["COL_SCI"], // scalable
    questions: math101Questions,
  },
  {
    id: "VOS116",
    name: "VOS 116",
    group: "vocational",
    colleges: "all",
    questions: vos116Questions,
  },
  {
    id: "VOS117",
    name: "VOS 117",
    group: "vocational",
    colleges: "all",
    questions: vos117Questions,
  },
];

export default courses;
