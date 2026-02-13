export const csm111Questions = [
  {
    id: "csm111-001",
    question: "What is data collection?",
    options: [
      "Analyzing data",
      "Presenting data",
      "Gathering information",
      "Making decisions",
    ],
    correct: "Gathering information",
    reason:
      "Data collection is the process of gathering information from various sources.",
  },
  {
    id: "csm111-002",
    question: "Which of the following is a method of data collection?",
    options: ["Questionnaire", "Observation", "Experiment", "All of the above"],
    correct: "All of the above",
    reason:
      "Questionnaires, observations, and experiments are all valid methods for collecting data.",
  },
  {
    id: "csm111-003",
    question: "What is the main advantage of using secondary data?",
    options: [
      "It's expensive",
      "It's time-saving",
      "It's always accurate",
      "It's always up-to-date",
    ],
    correct: "It's time-saving",
    reason:
      "Secondary data is already collected by others, making it faster to obtain than primary data.",
  },
  {
    id: "csm111-004",
    question: "What is the purpose of data editing?",
    options: [
      "To collect data",
      "To analyze data",
      "To clean and correct data",
      "To present data",
    ],
    correct: "To clean and correct data",
    reason:
      "Editing involves checking data for errors, omissions, and inconsistencies.",
  },
  {
    id: "csm111-005",
    question: "Which of the following is a type of data?",
    options: [
      "Qualitative",
      "Quantitative",
      "Both A and B",
      "None of the above",
    ],
    correct: "Both A and B",
    reason:
      "Data can be broadly classified into qualitative (descriptive) and quantitative (numerical) types.",
  },
  {
    id: "csm111-006",
    question:
      "What is the term for the entire group of individuals being studied?",
    options: ["Sample", "Population", "Dataset", "Statistic"],
    correct: "Population",
    reason:
      "A population represents the entire group that is the focus of a study.",
  },
  {
    id: "csm111-007",
    question: "What is a subset of the population?",
    options: ["Sample", "Population", "Dataset", "Statistic"],
    correct: "Sample",
    reason:
      "A sample is a smaller group selected from the population to represent it.",
  },
  {
    id: "csm111-008",
    question: "Why is sampling used?",
    options: [
      "To study the entire population",
      "To save time and money",
      "To increase accuracy",
      "To reduce errors",
    ],
    correct: "To save time and money",
    reason:
      "Studying a whole population is often too expensive and time-consuming, so sampling is used.",
  },
  {
    id: "csm111-009",
    question: "What is the main advantage of random sampling?",
    options: [
      "It's biased",
      "It's representative of the population",
      "It's expensive",
      "It's time-consuming",
    ],
    correct: "It's representative of the population",
    reason:
      "Random sampling reduces bias, making the sample more likely to reflect the true population.",
  },
  {
    id: "csm111-010",
    question:
      "What is the term for the difference between the sample and population values?",
    options: [
      "Sampling error",
      "Sampling bias",
      "Sampling variability",
      "Sampling frame",
    ],
    correct: "Sampling error",
    reason:
      "Sampling error refers to the discrepancy between sample statistics and true population parameters.",
  },
  {
    id: "csm111-011",
    question: "What is the most common measure of central tendency?",
    options: ["Mean", "Median", "Mode", "Range"],
    correct: "Mean",
    reason:
      "The arithmetic mean is the most frequently used average in statistics.",
  },
  {
    id: "csm111-012",
    question:
      "What is the middle value of a dataset when it is arranged in order?",
    options: ["Mean", "Median", "Mode", "Standard Deviation"],
    correct: "Median",
    reason:
      "The median is the literal center point of a sorted list of numbers.",
  },
  {
    id: "csm111-013",
    question: "What is the value that appears most frequently in a dataset?",
    options: ["Mean", "Median", "Mode", "Range"],
    correct: "Mode",
    reason: "The mode is defined as the most frequent observation in a set.",
  },
  {
    id: "csm111-014",
    question: "What is the formula for calculating the mean $\\bar{x}$?",
    options: [
      "$\\frac{\\sum x}{n}$",
      "$\\frac{n}{\\sum x}$",
      "$\\sum x - n$",
      "$n - \\sum x$",
    ],
    correct: "$\\frac{\\sum x}{n}$",
    reason:
      "The mean is calculated by dividing the sum of all values ($\\sum x$) by the number of values ($n$).",
  },
  {
    id: "csm111-015",
    question: "When is the median used?",
    options: [
      "When the data is skewed",
      "When the data is normal",
      "When the data is categorical",
      "When the data is numerical",
    ],
    correct: "When the data is skewed",
    reason:
      "The median is a better measure of central tendency than the mean when data contains outliers or is skewed.",
  },
  {
    id: "csm111-016",
    question: "What is probability?",
    options: [
      "A measure of certainty",
      "A measure of uncertainty",
      "A measure of variability",
      "A measure of central tendency",
    ],
    correct: "A measure of uncertainty",
    reason:
      "Probability quantifies the likelihood or chance that an uncertain event will occur.",
  },
  {
    id: "csm111-017",
    question: "What is the probability $P(E)$ of an impossible event?",
    options: ["$0$", "$1$", "$0.5$", "$\\frac{1}{2}$"],
    correct: "$0$",
    reason:
      "By definition, an event that cannot happen has a probability of $0$.",
  },
  {
    id: "csm111-018",
    question: "What is the probability $P(E)$ of a certain event?",
    options: ["$0$", "$1$", "$0.5$", "$\\frac{1}{2}$"],
    correct: "$1$",
    reason:
      "An event that is guaranteed to happen has a probability of $1$ (or $100\\%$).",
  },
  {
    id: "csm111-019",
    question: "What is the classical formula for probability $P(A)$?",
    options: [
      "$\\frac{n(A)}{n(S)}$",
      "$\\frac{n(S)}{n(A)}$",
      "$n(A) + n(S)$",
      "$n(A) - n(S)$",
    ],
    correct: "$\\frac{n(A)}{n(S)}$",
    reason:
      "Classical probability is the ratio of favorable outcomes $n(A)$ to the total sample space $n(S)$.",
  },
  {
    id: "csm111-020",
    question:
      "What is the term for the probability of an event $A$ occurring given that $B$ has already occurred?",
    options: [
      "Independence",
      "Dependence",
      "Mutually exclusive",
      "Conditional probability",
    ],
    correct: "Conditional probability",
    reason:
      "Conditional probability, denoted $P(A|B)$, looks at the likelihood of an event given a condition.",
  },
  {
    id: "csm111-021",
    question: "What is a set?",
    options: [
      "A collection of elements",
      "A single element",
      "A subset",
      "A superset",
    ],
    correct: "A collection of elements",
    reason:
      "A set is a well-defined collection of distinct objects or elements.",
  },
  {
    id: "csm111-022",
    question: "What is a set with no elements called?",
    options: [
      "Empty set ($\\emptyset$)",
      "Universal set ($U$)",
      "Subset",
      "Power set",
    ],
    correct: "Empty set ($\\emptyset$)",
    reason:
      "The empty set (or null set), denoted by $\\emptyset$ or $\\{\\}$, contains no members.",
  },
  {
    id: "csm111-023",
    question:
      "What is the set of all elements under consideration in a particular context?",
    options: ["Empty set", "Universal set", "Subset", "Power set"],
    correct: "Universal set",
    reason:
      "The universal set, often denoted by $U$ or $\\xi$, contains all objects under discussion.",
  },
  {
    id: "csm111-024",
    question: "What is the definition of $A \\subseteq B$?",
    options: [
      "Every element of $A$ is in $B$",
      "Some elements of $A$ are in $B$",
      "$A$ and $B$ share no elements",
      "$A$ is larger than $B$",
    ],
    correct: "Every element of $A$ is in $B$",
    reason:
      "If every element $x \\in A$ is also $x \\in B$, then $A$ is a subset of $B$.",
  },
  {
    id: "csm111-025",
    question: "What is the union of two sets, $A \\cup B$?",
    options: [
      "$\\{x : x \\in A \\text{ and } x \\in B\\}$",
      "$\\{x : x \\in A \\text{ or } x \\in B\\}$",
      "$\\{x : x \\notin A \\text{ and } x \\notin B\\}$",
      "$\\{x : x \\in A \\text{ but } x \\notin B\\}$",
    ],
    correct: "$\\{x : x \\in A \\text{ or } x \\in B\\}$",
    reason:
      "The union $A \\cup B$ combines all elements that are in $A$, in $B$, or in both.",
  },
  {
    id: "csm111-026",
    question: "What is the main disadvantage of using primary data?",
    options: [
      "It's expensive",
      "It's time-consuming",
      "It's not always accurate",
      "It's not always available",
    ],
    correct: "It's expensive",
    reason:
      "Collecting data first-hand requires significant resources, labor, and funding.",
  },
  {
    id: "csm111-027",
    question: "Which of the following is an example of qualitative data?",
    options: ["Age", "Income", "Opinion", "Height"],
    correct: "Opinion",
    reason:
      "Opinions are descriptive and non-numerical, making them qualitative.",
  },
  {
    id: "csm111-028",
    question: "What is the purpose of data cleaning?",
    options: [
      "To collect data",
      "To analyze data",
      "To remove errors and inconsistencies",
      "To present data",
    ],
    correct: "To remove errors and inconsistencies",
    reason:
      "Data cleaning ensures the dataset is high quality by fixing errors before analysis.",
  },
  {
    id: "csm111-029",
    question: "What is the difference between data and information?",
    options: [
      "Data is raw facts, while information is processed data",
      "Data is processed, while information is raw facts",
      "Data is qualitative, while information is quantitative",
      "Data is numerical, while information is categorical",
    ],
    correct: "Data is raw facts, while information is processed data",
    reason:
      "Data becomes information once it is organized or processed to have meaning.",
  },
  {
    id: "csm111-030",
    question: "Which of the following is a source of secondary data?",
    options: [
      "Questionnaire",
      "Observation",
      "Published reports",
      "Experiment",
    ],
    correct: "Published reports",
    reason:
      "Reports published by others are a classic source of secondary information.",
  },
  {
    id: "csm111-031",
    question:
      "What is the term for the sampling method where every individual has an equal chance of being selected?",
    options: [
      "Random sampling",
      "Stratified sampling",
      "Systematic sampling",
      "Cluster sampling",
    ],
    correct: "Random sampling",
    reason:
      "In Simple Random Sampling, every member of the population has an equal probability of selection.",
  },
  {
    id: "csm111-032",
    question: "What is the main advantage of stratified sampling?",
    options: [
      "It's simple",
      "It's quick",
      "It's representative of the population",
      "It's inexpensive",
    ],
    correct: "It's representative of the population",
    reason:
      "Stratified sampling ensures that subgroups (strata) are adequately represented.",
  },
  {
    id: "csm111-033",
    question:
      "What is the term for the difference between the sample and population values due to chance?",
    options: [
      "Sampling error",
      "Sampling bias",
      "Sampling variability",
      "Sampling frame",
    ],
    correct: "Sampling error",
    reason:
      "Even with a perfect method, the sample will differ slightly from the population due to chance.",
  },
  {
    id: "csm111-034",
    question: "What is the purpose of sampling?",
    options: [
      "To study the entire population",
      "To make inferences about the population",
      "To collect data",
      "To analyze data",
    ],
    correct: "To make inferences about the population",
    reason:
      "The goal of sampling is to learn something about a large group without checking every member.",
  },
  {
    id: "csm111-035",
    question: "Which of the following is a type of non-probability sampling?",
    options: [
      "Random sampling",
      "Stratified sampling",
      "Convenience sampling",
      "Systematic sampling",
    ],
    correct: "Convenience sampling",
    reason:
      "Convenience sampling is based on ease of access rather than random chance.",
  },
  {
    id: "csm111-036",
    question:
      "What formula identifies the position of the median in a sorted list of $n$ items?",
    options: [
      "$\\frac{n+1}{2}$",
      "$\\frac{n-1}{2}$",
      "$\\frac{n}{2}$",
      "$\\frac{n+1}{4}$",
    ],
    correct: "$\\frac{n+1}{2}$",
    reason:
      "The $\\frac{n+1}{2}$-th position identifies the middle value in an ordered dataset.",
  },
  {
    id: "csm111-037",
    question: "When is the mode used?",
    options: [
      "When the data is numerical",
      "When the data is categorical",
      "When the data is skewed",
      "When the data is normal",
    ],
    correct: "When the data is categorical",
    reason:
      "The mode is the only measure of central tendency suitable for nominal/categorical data.",
  },
  {
    id: "csm111-038",
    question: "What is the main advantage of using the median?",
    options: [
      "It's sensitive to outliers",
      "It's not sensitive to outliers",
      "It's easy to calculate",
      "It's always accurate",
    ],
    correct: "It's not sensitive to outliers",
    reason:
      "The median remains stable even if there are extremely high or low values in the set.",
  },
  {
    id: "csm111-039",
    question: "What is the formula for calculating the range?",
    options: [
      "$x_{max} - x_{min}$",
      "$x_{min} - x_{max}$",
      "$\\frac{x_{max} + x_{min}}{2}$",
      "$\\frac{x_{max} - x_{min}}{2}$",
    ],
    correct: "$x_{max} - x_{min}$",
    reason:
      "The range measures the total spread by subtracting the minimum value from the maximum value.",
  },
  {
    id: "csm111-040",
    question: "What is the main disadvantage of using the mean?",
    options: [
      "It's sensitive to outliers",
      "It's not sensitive to outliers",
      "It's difficult to calculate",
      "It's always inaccurate",
    ],
    correct: "It's sensitive to outliers",
    reason:
      "A single extreme value can pull the mean away from the 'typical' center of the data.",
  },
  {
    id: "csm111-041",
    question:
      "What is the concept that the probability of an event $A$ is independent of event $B$?",
    options: [
      "Independence",
      "Dependence",
      "Mutually exclusive",
      "Conditional probability",
    ],
    correct: "Independence",
    reason:
      "Independence means $P(A|B) = P(A)$, meaning the outcome of one does not change the probability of another.",
  },
  {
    id: "csm111-042",
    question: "What is the formula for conditional probability $P(A|B)$?",
    options: [
      "$\\frac{P(A \\cap B)}{P(B)}$",
      "$\\frac{P(A \\cap B)}{P(A)}$",
      "$\\frac{P(A)}{P(B)}$",
      "$\\frac{P(B)}{P(A)}$",
    ],
    correct: "$\\frac{P(A \\cap B)}{P(B)}$",
    reason:
      "The probability of $A$ given $B$ is the joint probability divided by the probability of the condition.",
  },
  {
    id: "csm111-043",
    question:
      "What is the concept that two events cannot occur simultaneously ($A \\cap B = \\emptyset$)?",
    options: ["Mutually exclusive", "Independent", "Dependent", "Conditional"],
    correct: "Mutually exclusive",
    reason:
      "Mutually exclusive events have no overlap; if one happens, the other cannot.",
  },
  {
    id: "csm111-044",
    question:
      "For mutually exclusive events $A$ and $B$, what is $P(A \\cup B)$?",
    options: [
      "$P(A) + P(B)$",
      "$P(A) - P(B)$",
      "$P(A) \\times P(B)$",
      "$\\frac{P(A)}{P(B)}$",
    ],
    correct: "$P(A) + P(B)$",
    reason:
      "For exclusive events, the probability of either occurring is the sum of their individual probabilities.",
  },
  {
    id: "csm111-045",
    question:
      "What is the concept that the probability of an event is affected by the occurrence of another event?",
    options: [
      "Dependence",
      "Independence",
      "Mutually exclusive",
      "Conditional probability",
    ],
    correct: "Dependence",
    reason:
      "In dependent events, the occurrence of one changes the likelihood of the other.",
  },
  {
    id: "csm111-046",
    question: "What is the intersection of two sets, $A \\cap B$?",
    options: [
      "$\\{x : x \\in A \\text{ and } x \\in B\\}$",
      "$\\{x : x \\in A \\text{ or } x \\in B\\}$",
      "$\\{x : x \\notin A \\text{ and } x \\notin B\\}$",
      "$\\{x : x \\in A \\text{ but } x \\notin B\\}$",
    ],
    correct: "$\\{x : x \\in A \\text{ and } x \\in B\\}$",
    reason:
      "Intersection $A \\cap B$ captures only the elements that exist in both Set $A$ and Set $B$.",
  },
  {
    id: "csm111-047",
    question: "What is the union of two sets, $A \\cup B$?",
    options: [
      "$\\{x : x \\in A \\text{ and } x \\in B\\}$",
      "$\\{x : x \\in A \\text{ or } x \\in B\\}$",
      "$\\{x : x \\notin A \\text{ and } x \\notin B\\}$",
      "$\\{x : x \\in A \\text{ but } x \\notin B\\}$",
    ],
    correct: "$\\{x : x \\in A \\text{ or } x \\in B\\}$",
    reason:
      "Union includes all elements belonging to Set $A$, Set $B$, or both.",
  },
  {
    id: "csm111-048",
    question: "What is the complement of set $A$, denoted $A^c$ or $A'$?",
    options: [
      "$\\{x : x \\in A\\}$",
      "$\\{x : x \\in U \\text{ and } x \\notin A\\}$",
      "$\\{x : x \\in A \\cap B\\}$",
      "$\\{x : x \\in A \\cup B\\}$",
    ],
    correct: "$\\{x : x \\in U \\text{ and } x \\notin A\\}$",
    reason:
      "The complement consists of all elements in the universal set $U$ that are not in set $A$.",
  },
  {
    id: "csm111-049",
    question: "What is the difference of two sets, $A - B$?",
    options: [
      "$\\{x : x \\in A \\cap B\\}$",
      "$\\{x : x \\in A \\cup B\\}$",
      "$\\{x : x \\in A \\text{ and } x \\notin B\\}$",
      "$\\{x : x \\notin A \\text{ and } x \\notin B\\}$",
    ],
    correct: "$\\{x : x \\in A \\text{ and } x \\notin B\\}$",
    reason: "$A - B$ consists of elements that are in $A$ but not in $B$.",
  },
  {
    id: "csm111-050",
    question: "What is the Cartesian product $A \\times B$?",
    options: [
      "$\\{x : x \\in A \\cap B\\}$",
      "$\\{x : x \\in A \\cup B\\}$",
      "$\\{(a, b) : a \\in A \\text{ and } b \\in B\\}$",
      "$\\{x : x \\in A - B\\}$",
    ],
    correct: "$\\{(a, b) : a \\in A \\text{ and } b \\in B\\}$",
    reason:
      "The Cartesian product $(A \\times B)$ is the set of all possible ordered pairs $(a, b)$. [attachment_0](attachment)",
  },
  {
    id: "csm111-051",
    question: "What is the main purpose of data validation?",
    options: [
      "To collect data",
      "To analyze data",
      "To ensure data accuracy",
      "To present data",
    ],
    correct: "To ensure data accuracy",
    reason:
      "Validation ensures that the data entered meets specific criteria and is correct.",
  },
  {
    id: "csm111-052",
    question: "Which of the following is an example of quantitative data?",
    options: ["Opinion", "Age", "Sex", "Marital status"],
    correct: "Age",
    reason:
      "Age is expressed in numbers and can be measured, making it quantitative.",
  },
  {
    id: "csm111-053",
    question: "What is the difference between primary and secondary data?",
    options: [
      "Primary data is collected first-hand, while secondary data is collected second-hand",
      "Primary data is collected second-hand, while secondary data is collected first-hand",
      "Primary data is qualitative, while secondary data is quantitative",
      "Primary data is numerical, while secondary data is categorical",
    ],
    correct:
      "Primary data is collected first-hand, while secondary data is collected second-hand",
    reason:
      "The distinction lies in who collected the data and for what purpose.",
  },
  {
    id: "csm111-054",
    question: "What is the main advantage of using online surveys?",
    options: [
      "It's expensive",
      "It's time-consuming",
      "It's convenient",
      "It's biased",
    ],
    correct: "It's convenient",
    reason:
      "Online surveys are easy to distribute and convenient for both researchers and respondents.",
  },
  {
    id: "csm111-055",
    question: "Which of the following is a type of data collection method?",
    options: ["Questionnaire", "Observation", "Experiment", "All of the above"],
    correct: "All of the above",
    reason:
      "Various methods exist for data gathering depending on the research goals.",
  },
  {
    id: "csm111-056",
    question:
      "What is the term for the sampling method where individuals are selected at regular intervals?",
    options: [
      "Random sampling",
      "Stratified sampling",
      "Systematic sampling",
      "Cluster sampling",
    ],
    correct: "Systematic sampling",
    reason:
      "Systematic sampling involves choosing every $n$-th member from a list.",
  },
  {
    id: "csm111-057",
    question: "What is the main advantage of cluster sampling?",
    options: [
      "It's simple",
      "It's quick",
      "It's cost-effective",
      "It's representative of the population",
    ],
    correct: "It's cost-effective",
    reason:
      "Cluster sampling reduces travel and administrative costs by focusing on specific groups.",
  },
  {
    id: "csm111-058",
    question:
      "What is the term for the sampling method where individuals are selected based on their characteristics?",
    options: [
      "Random sampling",
      "Stratified sampling",
      "Systematic sampling",
      "Quota sampling",
    ],
    correct: "Stratified sampling",
    reason:
      "Stratified sampling divides the population into groups based on specific traits.",
  },
  {
    id: "csm111-059",
    question: "What is the main disadvantage of non-probability sampling?",
    options: [
      "It's biased",
      "It's representative of the population",
      "It's expensive",
      "It's time-consuming",
    ],
    correct: "It's biased",
    reason:
      "Since selection isn't random, some members of the population are systematically excluded.",
  },
  {
    id: "csm111-060",
    question:
      "What is the term for the process of selecting a sample from the population?",
    options: [
      "Sampling frame",
      "Sampling method",
      "Sampling process",
      "Sampling design",
    ],
    correct: "Sampling process",
    reason:
      "The overall workflow of choosing a sample is known as the sampling process.",
  },
  {
    id: "csm111-061",
    question:
      "What is the formula for calculating the weighted mean $\\bar{x}_w$?",
    options: [
      "$\\frac{\\sum wx}{\\sum w}$",
      "$\\frac{\\sum w}{\\sum wx}$",
      "$\\frac{\\sum x}{n}$",
      "$\\frac{\\sum w}{n}$",
    ],
    correct: "$\\frac{\\sum wx}{\\sum w}$",
    reason:
      "Weighted mean accounts for the relative importance (weight $w$) of each value $x$.",
  },
  {
    id: "csm111-062",
    question: "When is the harmonic mean used?",
    options: [
      "When the data is numerical",
      "When the data is categorical",
      "When the data is skewed",
      "When the data is rates or ratios",
    ],
    correct: "When the data is rates or ratios",
    reason:
      "The harmonic mean is appropriate for averaging things like speed or price-to-earnings ratios.",
  },
  {
    id: "csm111-063",
    question: "What is the main advantage of using the mode?",
    options: [
      "It's sensitive to outliers",
      "It's not sensitive to outliers",
      "It's easy to calculate",
      "It's always accurate",
    ],
    correct: "It's not sensitive to outliers",
    reason:
      "Outliers do not affect the most frequently occurring value in a dataset.",
  },
  {
    id: "csm111-064",
    question: "What is the formula for calculating the geometric mean $G$?",
    options: [
      "$(\\prod x)^{1/n}$",
      "$\\frac{\\sum x}{n}$",
      "$(\\sum x)^n$",
      "$(\\prod x)^n$",
    ],
    correct: "$(\\prod x)^{1/n}$",
    reason:
      "The geometric mean is the $n$-th root of the product of $n$ numbers.",
  },
  {
    id: "csm111-065",
    question: "When is the median used?",
    options: [
      "When the data is numerical",
      "When the data is categorical",
      "When the data is skewed",
      "When the data is normal",
    ],
    correct: "When the data is skewed",
    reason:
      "Median provides a more central value than the mean in asymmetrical distributions.",
  },
  {
    id: "csm111-066",
    question:
      "What is the concept that the probability of an event is affected by the occurrence of another event?",
    options: [
      "Dependence",
      "Independence",
      "Mutually exclusive",
      "Conditional probability",
    ],
    correct: "Dependence",
    reason: "This is the definition of dependent events in probability theory.",
  },
  {
    id: "csm111-067",
    question: "What is the formula for Bayes' theorem?",
    options: [
      "$P(A|B) = \\frac{P(B|A) \\times P(A)}{P(B)}$",
      "$P(A|B) = \\frac{P(A|B) \\times P(B)}{P(A)}$",
      "$P(A|B) = \\frac{P(A) \\times P(B)}{P(A \\cap B)}$",
      "$P(A|B) = \\frac{P(B) \\times P(A)}{P(A \\cup B)}$",
    ],
    correct: "$P(A|B) = \\frac{P(B|A) \\times P(A)}{P(B)}$",
    reason:
      "Bayes' theorem relates current probability to prior knowledge of conditions.",
  },
  {
    id: "csm111-068",
    question:
      "What is the concept that two events are equally likely to occur?",
    options: [
      "Equally likely events",
      "Mutually exclusive events",
      "Independent events",
      "Dependent events",
    ],
    correct: "Equally likely events",
    reason:
      "Equally likely events have the exact same numerical probability (e.g., $0.5$ for a fair coin flip).",
  },
  {
    id: "csm111-069",
    question:
      "What is the multiplication rule for independent events $A$ and $B$?",
    options: [
      "$P(A \\cap B) = P(A) \\times P(B)$",
      "$P(A \\cap B) = P(A) + P(B)$",
      "$P(A \\cap B) = P(A) - P(B)$",
      "$P(A \\cap B) = \\frac{P(A)}{P(B)}$",
    ],
    correct: "$P(A \\cap B) = P(A) \\times P(B)$",
    reason:
      "For independent events, we multiply their individual probabilities to find the joint probability.",
  },
  {
    id: "csm111-070",
    question:
      "What formula is used to update the probability of an event based on new evidence?",
    options: [
      "Conditional probability",
      "Bayes' theorem",
      "Independence",
      "Dependence",
    ],
    correct: "Bayes' theorem",
    reason:
      "Bayes' theorem is fundamentally about updating probabilities as more evidence becomes available.",
  },
  {
    id: "csm111-071",
    question: "What is the power set $\\mathcal{P}(A)$ of a set $A$?",
    options: [
      "The set of all subsets of $A$",
      "The set of all elements in $A$",
      "The empty set",
      "The universal set",
    ],
    correct: "The set of all subsets of $A$",
    reason: "The power set includes the empty set and the set itself.",
  },
  {
    id: "csm111-072",
    question:
      "If a set $A$ has $n$ elements, how many elements are in its power set $\\mathcal{P}(A)$?",
    options: ["$2^n$", "$n^2$", "$n!$", "$\\frac{n}{2}$"],
    correct: "$2^n$",
    reason: "A set with $n$ elements has $2^n$ possible subsets.",
  },
  {
    id: "csm111-073",
    question:
      "What is the concept that two sets have no elements in common ($A \\cap B = \\emptyset$)?",
    options: [
      "Disjoint sets",
      "Overlapping sets",
      "Equal sets",
      "Equivalent sets",
    ],
    correct: "Disjoint sets",
    reason: "Disjoint sets have an intersection that is the empty set.",
  },
  {
    id: "csm111-074",
    question: "What is the set-builder notation for $A \\cup B$?",
    options: [
      "$\\{x : x \\in A \\lor x \\in B\\}$",
      "$\\{x : x \\in A \\land x \\in B\\}$",
      "$\\{x : x \\in A \\land x \\notin B\\}$",
      "$\\{x : x \\notin A \\land x \\in B\\}$",
    ],
    correct: "$\\{x : x \\in A \\lor x \\in B\\}$",
    reason: "The logical 'OR' ($\\lor$) operator defines the union of sets.",
  },
  {
    id: "csm111-075",
    question: "What is the concept that two sets have the same elements?",
    options: [
      "Equal sets",
      "Equivalent sets",
      "Disjoint sets",
      "Overlapping sets",
    ],
    correct: "Equal sets",
    reason:
      "Sets are equal if they contain exactly the same members, regardless of order.",
  },
  {
    id: "csm111-076",
    question: "What is the purpose of data cleaning?",
    options: [
      "To collect data",
      "To analyze data",
      "To remove errors and inconsistencies",
      "To present data",
    ],
    correct: "To remove errors and inconsistencies",
    reason: "Cleaning ensures the data is accurate and ready for processing.",
  },
  {
    id: "csm111-077",
    question: "Which of the following is an example of categorical data?",
    options: ["Age", "Income", "Sex", "Height"],
    correct: "Sex",
    reason: "Sex is a category/label rather than a numerical measurement.",
  },
  {
    id: "csm111-078",
    question:
      "What is the difference between structured and unstructured data?",
    options: [
      "Structured data is qualitative, while unstructured data is quantitative",
      "Structured data is quantitative, while unstructured data is qualitative",
      "Structured data is organized, while unstructured data is not",
      "Structured data is numerical, while unstructured data is categorical",
    ],
    correct: "Structured data is organized, while unstructured data is not",
    reason:
      "Structured data fits into predefined models (like tables), while unstructured does not.",
  },
  {
    id: "csm111-079",
    question: "What is the main advantage of using focus groups?",
    options: [
      "It's expensive",
      "It's time-consuming",
      "It's interactive",
      "It's biased",
    ],
    correct: "It's interactive",
    reason:
      "Focus groups allow for discussion and deeper insights through participant interaction.",
  },
  {
    id: "csm111-080",
    question: "Which of the following is a type of data visualization?",
    options: ["Chart", "Graph", "Table", "All of the above"],
    correct: "All of the above",
    reason:
      "Charts, graphs, and tables are all used to visually represent data. ",
  },
  {
    id: "csm111-081",
    question:
      "What is the term for the sampling method where individuals are selected based on their expertise?",
    options: [
      "Random sampling",
      "Stratified sampling",
      "Systematic sampling",
      "Purposive sampling",
    ],
    correct: "Purposive sampling",
    reason:
      "Purposive (or judgmental) sampling targets specific experts for a study.",
  },
  {
    id: "csm111-082",
    question: "What is the main advantage of simple random sampling?",
    options: [
      "It's biased",
      "It's representative of the population",
      "It's expensive",
      "It's time-consuming",
    ],
    correct: "It's representative of the population",
    reason:
      "Randomness ensures that every individual has an equal chance, promoting representation.",
  },
  {
    id: "csm111-083",
    question:
      "What is the term for the difference between the sample and population values?",
    options: [
      "Sampling error",
      "Sampling bias",
      "Sampling variability",
      "Sampling frame",
    ],
    correct: "Sampling error",
    reason:
      "This is the natural variation between a sample result and the true population result.",
  },
  {
    id: "csm111-084",
    question: "What is the purpose of sampling?",
    options: [
      "To study the entire population",
      "To make inferences about the population",
      "To collect data",
      "To analyze data",
    ],
    correct: "To make inferences about the population",
    reason:
      "Sampling allows researchers to draw conclusions about a whole group from a subset.",
  },
  {
    id: "csm111-085",
    question: "Which of the following is a type of sampling frame?",
    options: ["List of individuals", "Map", "Database", "All of the above"],
    correct: "All of the above",
    reason: "A sampling frame is any source from which a sample is drawn.",
  },
  {
    id: "csm111-086",
    question: "What is the formula for calculating the midrange?",
    options: [
      "$\\frac{x_{max} + x_{min}}{2}$",
      "$\\frac{x_{max} - x_{min}}{2}$",
      "$\\frac{\\sum x}{n}$",
      "$(\\sum x)^2$",
    ],
    correct: "$\\frac{x_{max} + x_{min}}{2}$",
    reason:
      "The midrange is the average of the maximum and minimum values in a dataset.",
  },
  {
    id: "csm111-087",
    question: "When is the midrange used?",
    options: [
      "When the data is numerical",
      "When the data is categorical",
      "When the data is skewed",
      "When the data is normal",
    ],
    correct: "When the data is numerical",
    reason:
      "Midrange requires mathematical operations that are only applicable to numbers.",
  },
  {
    id: "csm111-088",
    question: "What is the main advantage of using the midrange?",
    options: [
      "It's sensitive to outliers",
      "It's not sensitive to outliers",
      "It's easy to calculate",
      "It's always accurate",
    ],
    correct: "It's easy to calculate",
    reason: "You only need to know the highest and lowest values to find it.",
  },
  {
    id: "csm111-089",
    question: "What is the logic behind calculating the trimmed mean?",
    options: [
      "$\\frac{\\sum x}{n}$",
      "Removing a % of extreme values before averaging",
      "Adding outliers to the sum",
      "$(\\sum x)^2$",
    ],
    correct: "Removing a % of extreme values before averaging",
    reason:
      "Trimmed mean removes a percentage of the smallest and largest values to minimize outlier impact.",
  },
  {
    id: "csm111-090",
    question: "When is the trimmed mean used?",
    options: [
      "When the data is numerical",
      "When the data is categorical",
      "When the data is skewed",
      "When the data has outliers",
    ],
    correct: "When the data has outliers",
    reason:
      "Trimming the data helps mitigate the distorting effect of extreme values.",
  },
  {
    id: "csm111-091",
    question:
      "What is the concept that the probability of an event is updated based on new information?",
    options: [
      "Conditional probability",
      "Bayes' theorem",
      "Independence",
      "Dependence",
    ],
    correct: "Bayes' theorem",
    reason:
      "Bayes' theorem provides the mathematical framework for updating beliefs based on data.",
  },
  {
    id: "csm111-092",
    question:
      "What is the formula for the probability of mutually exclusive events $P(A \\cup B)$?",
    options: [
      "$P(A) + P(B)$",
      "$P(A) - P(B)$",
      "$P(A) \\times P(B)$",
      "$\\frac{P(A)}{P(B)}$",
    ],
    correct: "$P(A) + P(B)$",
    reason:
      "When events can't overlap, their combined probability is their sum.",
  },
  {
    id: "csm111-093",
    question:
      "What mathematical property holds if events $A$ and $B$ are independent?",
    options: [
      "$P(A \\cap B) = P(A) \\times P(B)$",
      "$P(A \\cap B) = P(A) + P(B)$",
      "$P(A \\cap B) = P(A) - P(B)$",
      "$P(A \\cap B) = \\frac{P(A)}{P(B)}$",
    ],
    correct: "$P(A \\cap B) = P(A) \\times P(B)$",
    reason:
      "If the product of individual probabilities equals the joint probability, the events are independent.",
  },
  {
    id: "csm111-094",
    question: "What is the formula for the probability of independent events?",
    options: [
      "$P(A \\cap B) = P(A) \\times P(B)$",
      "$P(A \\cap B) = P(A) + P(B)$",
      "$P(A \\cap B) = P(A) - P(B)$",
      "$P(A \\cap B) = \\frac{P(A)}{P(B)}$",
    ],
    correct: "$P(A \\cap B) = P(A) \\times P(B)$",
    reason:
      "This multiplication rule is the defining formula for independent events.",
  },
  {
    id: "csm111-095",
    question:
      "What is the concept that the probability of an event is affected by the occurrence of another event?",
    options: [
      "Dependence",
      "Independence",
      "Mutually exclusive",
      "Conditional probability",
    ],
    correct: "Dependence",
    reason:
      "Dependence indicates a relationship where one event influences the outcome of another.",
  },
  {
    id: "csm111-096",
    question:
      "What is the set of all elements that are in $A$, in $B$, or in both?",
    options: ["$A \\cup B$", "$A \\cap B$", "$A - B$", "$B - A$"],
    correct: "$A \\cup B$",
    reason:
      "$A \\cup B$ represents the union of sets $A$ and $B$. [attachment_1](attachment)",
  },
  {
    id: "csm111-097",
    question: "What is the set of all elements that are in both $A$ and $B$?",
    options: ["$A \\cup B$", "$A \\cap B$", "$A - B$", "$B - A$"],
    correct: "$A \\cap B$",
    reason:
      "$A \\cap B$ represents the intersection of sets $A$ and $B$. [attachment_2](attachment)",
  },
  {
    id: "csm111-098",
    question: "What is the set of all elements that are in $A$ but not in $B$?",
    options: ["$A \\cup B$", "$A \\cap B$", "$A - B$", "$B - A$"],
    correct: "$A - B$",
    reason:
      "$A - B$ (relative complement) removes any elements of $B$ from set $A$.",
  },
  {
    id: "csm111-099",
    question: "What is the set of all elements that are in $B$ but not in $A$?",
    options: ["$A \\cup B$", "$A \\cap B$", "$A - B$", "$B - A$"],
    correct: "$B - A$",
    reason: "$B - A$ represents elements unique to set $B$.",
  },
  {
    id: "csm111-100",
    question: "What is the concept that two sets have the exact same elements?",
    options: [
      "Equal sets",
      "Equivalent sets",
      "Disjoint sets",
      "Overlapping sets",
    ],
    correct: "Equal sets",
    reason: "Equal sets must have the exact same members.",
  },
];
