"use server";

import { promises as fs } from 'fs';



//type CurrentState = { success: boolean; error: boolean };

export const getDataTBA = async (
    apipath:string,
) => {
    
    // Get TBA API evironment variales
    const tbaurl = process.env.TBA_URL + apipath;
    const tbakey = process.env.TBA_KEYNAME + "";
    const tbaval = process.env.TBA_KEYVAL + "";

    // Set headers for TBA auth
    const headers = new Headers();
    headers.set('Content-Type', 'application/json');
    headers.set(tbakey, tbaval);
    const requestOptions = {
        method: 'GET',
        headers: headers,
    };

    try {
        const dataFetch = await fetch(tbaurl, requestOptions);
        const data = await dataFetch.json();
        return ({result: true, message: 'Retrieved data from TBA url ' + tbaurl, data: data});
    } catch (error) {
        console.log({message: error})
        return ({result: false, message: 'Unable to etrieved data from TBA url ' + tbaurl, data: []});
    }
};

export const checkDataDir = async (
    datapath:string
) => {
    const dataDir = "./data";
    // Try to read data directory and create if it doesn't exist
    try {
        const checkDir = await fs.readdir(dataDir + datapath);
        return ({result: true, message: 'Directory ' + dataDir + datapath + ' exists, no action needed.', data: []});
    } catch (error) {
        try {
            const makeDir = await fs.mkdir(dataDir + datapath);
            return ({result: true, message: dataDir + datapath + ' created.', data: []});
        } catch (error) {
            console.log({message: error});
            return ({result: false, message: 'Could not create ' + dataDir + datapath + ' .', data: []});
        }
        
    }
};

export const checkDataFile = async (
    datapath:string,
    datafile:string
) => {
    const dataDir = "./data";
    const dataFilePath = dataDir + datapath + datafile;
    try {
        const readFile = await fs.readFile(dataFilePath)
        const data = await JSON.parse(readFile.toString());
        return ({result: true, message: 'Data returned from file ' + dataFilePath + ' .', data: data});
    } catch (error) {
        return ({result: false, message: 'Data does not exist ' + dataFilePath + ' .', data: []});
    }
};

export const storeDataFile = async (
    datapath:string,
    datafile:string,
    data:object
) => {
    //try to right data file and create with data if it doesn't exist
    const dataDir = "./data";
    const dataFilePath = dataDir + datapath + datafile;
    try {
        const writeData = JSON.stringify(data, null, '\t');
        const writeFile = await fs.writeFile(dataFilePath, writeData);
        const success = {result: true, message: 'Data writen to ' + dataFilePath + ' .'};
        return (success)
    } catch (error) {
        console.log({message: error});
        const success = {result: false, message: 'Could not write Data to ' + dataFilePath + ' .'};
        return (success)
    }
};

export const dataCheckGetStore = async (
    datapath:string,
    datafile:string,
    apipath:string
) => {
    // Collect messages and data along through the steps.
    let messages = ['Checking for file data.'];

    // Check for Season Districts Data file and if so stop here
    const getFIleData = await checkDataFile(datapath, datafile);
    messages.push(getFIleData.message)
    if (getFIleData.result) { return ({results: messages, data: getFIleData.data}); }

    // Check for Season Data directory
    const checkDir = await checkDataDir(datapath);
    messages.push(checkDir.message);
    if (!checkDir.result) { return ({results: messages, data: []}); }

    // Get data from TBA API
    const getTBA = await getDataTBA(apipath);
    messages.push(getTBA.message);
    if (!getTBA.result) { return ({results: messages, data: []}); }

    // Write Districts Data FIle for the Season
    const wrtieFileData = await storeDataFile(datapath, datafile, getTBA.data);
    messages.push(wrtieFileData.message);
    if (!wrtieFileData.result) { return ({results: messages, data: []}); }

    // Check the file data again to verify it all worked
    const getFIleData2 = await checkDataFile(datapath, datafile);
    messages.push(getFIleData2.message)
    if (!getFIleData2.result) { return ({results: messages, data: []}); }
    return ({results: messages, data: getFIleData2.data});
};

export const getSeasonDistricts = async (
    Season: string
) => {
    // Set constants for functions
    const datapath = '/' + Season;
    const datafile = '/districts.json';
    const apipath = '/districts/' + Season;

    const setupDistrictsData = await dataCheckGetStore(datapath, datafile, apipath);
    return ({results: setupDistrictsData.results, data: setupDistrictsData.data});

};

export const getSeasonEvents = async (
    Season: string
) => {
    // Set constants for functions
    const datapath = '/' + Season;
    const datafile = '/events.json';
    const apipath = '/events/' + Season;

    const setupDistrictsData = await dataCheckGetStore(datapath, datafile, apipath);
    return ({results: setupDistrictsData.results, data: setupDistrictsData.data});

};

export const getSeasonTeams = async (
    Season: string
) => {
    let teamsData = [];
    let teamsMessages = [];
    let i = 0;
    let newteams = true;


    function appendTeamMsgs(item) {
        teamsMessages.push(item);
      }

      function appendTeamsData(item) {
        teamsData.push(item);
      }


    while (newteams) {
    // Set constants for functions
    const datapath = '/' + Season + '/teams';
    const datafile = '/teams-'+i+'.json';
    const apipath = '/teams/' + Season + '/' +i;
    const setupTeamsData = await dataCheckGetStore(datapath, datafile, apipath);
    
    const messagearray = setupTeamsData.results;
    messagearray.forEach(appendTeamMsgs);

    const dataarray = setupTeamsData.data;
    dataarray.forEach(appendTeamsData);
    let arraysize = dataarray.length;
    if (arraysize < 1) { newteams = false; }
    i++;
    }
    //write a single file with all teams
    const wrtieFileData = await storeDataFile('/' + Season, '/allteams.json', teamsData);

    return ({results: teamsMessages, data: teamsData});


};