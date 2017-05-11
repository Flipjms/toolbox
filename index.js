#!/usr/bin/env node --harmony
const program = require('commander')
const fs = require('fs')
const _ = require('underscore')

const modulesPath = './modules/'
const modulesFolder = fs.readdirSync(modulesPath)
let modules = [];

_.each(modulesFolder, filename => {
    modules.push({
        name: filename,
        initFunction: require(modulesPath+filename+'/init')
    })
})

_.each(modules, module => {
    module.initFunction(program)
})

program.parse(process.argv);
