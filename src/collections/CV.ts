import type { CollectionConfig } from "payload";
import { title } from "process";

export const CV: CollectionConfig = {
    slug: "cv",
    fields: [
        {
            type: "tabs",
            tabs: [
                {
                    name: "generalInformations",
                    fields: [
                        {
                            name: "title",
                            type: "text",
                            required: true
                        },
                        {
                            name: "prospect",
                            type: "relationship",
                            relationTo: "users"
                        }
                    ]
                },
                {
                    name: 'synthese',
                    fields: [
                        {
                            type: "textarea",
                            name: "synthesis"
                        },
                    ]
                },
                {
                    name: 'skills',
                    fields: [
                        {
                            type: "array",
                            name: "skillsList",
                            fields: [
                                {
                                    type: "text",
                                    name: "skillLabel"
                                }, 
                                {
                                    type: "text",
                                    name: "skillCategory"
                                }
                            ]
                        },
                    ]
                },
                {
                    name: 'formations',
                    fields: [
                        {
                            type: "array",
                            name: "formationsList",
                            fields: [
                                {
                                    type: "text",
                                    name: "formationName"
                                }, 
                                {
                                    type: "text",
                                    name: "formationOrganism"
                                }, 
                                {
                                    type: "date",
                                    name: "formationDateStart"
                                }, 
                                {
                                    type: "text",
                                    name: "formationDateEnd"
                                }
                            ]
                        },
                    ]
                },
                {
                    name: 'languages',
                    fields: [
                        {
                            type: "array",
                            name: "languagesList",
                            fields: [
                                {
                                    type: "text",
                                    name: "languageName"
                                }, 
                                {
                                    type: "number",
                                    name: "languangeLevel"
                                }
                            ]
                        },
                    ]
                },
                {
                    name: 'experiences',
                    fields: [
                        {
                            type: "array",
                            name: "experiencesList",
                            fields: [
                                {
                                    type: "text",
                                    name: "jobTitle"
                                }, 
                                {
                                    type: "text",
                                    name: "jobEntreprise"
                                }, 
                                {
                                    type: "date",
                                    name: "jobDateStart"
                                }, 
                                {
                                    type: "date",
                                    name: "jobDateEnd"
                                }, 
                                {
                                    type: "textarea",
                                    name: "jobDescription"
                                }
                            ]
                        },
                    ]
                },
            ]
        }
    ],
    endpoints: [
        {
            method: "post",
            path: "/createCV",
            handler: async (req) => 
            {
                if(!req || typeof req.json !== "function")
                {
                    return Response.json({message: "No body"})
                }

                const data = await req.json();

                var prospect = data.prospect[0];


                const skillsList = [] 
                const formationsList = [] 
                const languagesList = [] 
                const experiencesList = []

                if(data.skill)
                {
                    const skillsInput = data.skill
                    const skillsCategoryInput = data.category

                    for( let index = 0; index < skillsInput.length ; index++)
                    {
                        skillsList.push({skillLabel: skillsInput[index], skillCategory: skillsCategoryInput[index] })
                    }
                }
                
                if(data.formationName)
                {
                    const formationNamesInput = data.formationName
                    const formationOrganismsInput = data.formationOrganism
                    const formationStartInput = data.formationStartDate
                    const formationEndInput = data.formationEndDate

                    for( let index = 0; index < formationNamesInput.length ; index++)
                    {
                        formationsList.push({formationName: formationNamesInput[index], formationOrganism: formationOrganismsInput[index], formationDateStart: formationStartInput[index], formationDateEnd: formationEndInput[index] })
                    }
                }

                
                if(data.language)
                {
                    const languagesInput = data.language
                    const languagesLevelInput = data.languageLevel

                    for( let index = 0; index < languagesInput.length ; index++)
                    {
                        languagesList.push({languageName: languagesInput[index], languangeLevel: languagesLevelInput[index] })
                    }
                }

                if(data.jobTitle)
                {
                    const jobTitlesInput = data.jobTitle
                    const jobEntreprisesInput = data.jobEntreprise
                    const jobStartInput = data.jobStartDate
                    const jobEndInput = data.jobEndDate
                    const jobDescriptionsInput = data.jobDescription

                    for( let index = 0; index < jobTitlesInput.length ; index++)
                    {
                        experiencesList.push({jobTitle: jobTitlesInput[index], jobEntreprise: jobEntreprisesInput[index], jobDateStart: jobStartInput[index], jobDateEnd: jobEndInput[index], jobDescription: jobDescriptionsInput[index] })
                    }
                }
                
                const cvData = {
                    generalInformations: {
                        title: "CV",
                        prospect
                    },
                    synthese:{
                        synthesis: data.synthese[0],
                    },
                    skills:{
                        skillsList,
                    },
                    formations:{
                        formationsList,
                    },
                    languages: {
                        languagesList,
                    },
                    experiences: {
                        experiencesList
                    }
                }

                await req.payload.create({
                    collection: "cv",
                    data: cvData
                })

                return Response.json({res: "CV créé"})
            }
        }
    ]
}