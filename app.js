const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

async function main() {

  let employeeArr = [];
  // Add employees
  let addMoreEmployees = true;
  let i = 1;
  while (addMoreEmployees) {
    const more = await inquirer.prompt([
      {
        type: 'list',
        message: 'Add a new employee or exit:',
        choices: ['Add Manager', 'Add Engineer', 'Add Intern', 'Exit'],
        name: 'choice'
      }
    ])
    if (more.choice === 'Exit') addMoreEmployees = false;
    else if (more.choice === 'Add Manager') {
      const managerInfo = await inquirer.prompt([
        {
          type: 'input',
          message: 'Please enter Manager\'s name:',
          name: 'name'
        },
        {
          type: 'input',
          message: 'Please enter Manager\'s email:',
          name: 'email'
        },
        {
          type: 'input',
          message: 'Please enter Manager\'s Office number:',
          name: 'officeNum'
        }
      ])
      employeeArr.push(new Manager(managerInfo.name, i, managerInfo.email, managerInfo.officeNum));
    }
    else if (more.choice === 'Add Engineer') {
      const engInfo = await inquirer.prompt([
        {
          type: 'input',
          message: 'Please enter Engineer\'s name:',
          name: 'name'
        },
        {
          type: 'input',
          message: 'Please enter Engineer\'s email:',
          name: 'email'
        },
        {
          type: 'input',
          message: 'Please enter Engineer\'s github:',
          name: 'github'
        }
      ])
      employeeArr.push(new Engineer(engInfo.name, i, engInfo.email, engInfo.github));
    }
    else if (more.choice === 'Add Intern') {
      const intInfo = await inquirer.prompt([
        {
          type: 'input',
          message: 'Please enter Intern\'s name:',
          name: 'name'
        },
        {
          type: 'input',
          message: 'Please enter Intern\'s email:',
          name: 'email'
        },
        {
          type: 'input',
          message: 'Please enter Intern\'s school:',
          name: 'school'
        }
      ])
      employeeArr.push(new Intern(intInfo.name, i, intInfo.email, intInfo.school));
    }
    i++;
    console.log('');
  }

  console.log('All Employees registered, creating team page.');
  // Convert objects to HTML
  const html = render(employeeArr);
  // Write output file
  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR);
  fs.writeFileSync(outputPath, html);
}

main();