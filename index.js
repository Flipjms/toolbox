#!/usr/bin/env node --harmony
const program = require('commander')
const chalk = require('chalk')
const mkdirp = require('mkdirp')
const fs = require('fs')
const _ = require('underscore')

const path = require('./paths')

program
    .command('vuex:module')
    .description('create boilerplate files for vuex module')
    .option("-f, --folder [name]", "Folder Name")
    .option("-p, --path [name]", "Path where the folder should be created")
    .action(function(options){
        if (typeof options.folder === 'undefined') {
            console.error(chalk.red('ERROR: ') + 'folder name must be specified')
            process.exit(0);
        }

        const folderPath = path.vuex.module + options.folder
        const stubsPath = __dirname + '/stubs/vuex/module/'

        mkdirp(folderPath, function (err) {
            if (err) {
                console.error(chalk.red('ERROR: ') + err)
                process.exit(0);
            }
            
            const files = fs.readdirSync(stubsPath)

            _.each(files, filename => {
                fs.createReadStream(stubsPath + filename).pipe(fs.createWriteStream(folderPath + '/' + filename))
            })

            console.info(chalk.green('Module ' + options.folder + ' created successfully'))
        });
    });

program.parse(process.argv);