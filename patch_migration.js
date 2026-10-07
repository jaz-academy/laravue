const fs = require('fs');
const file = fs.readdirSync('d:/Libraries/Apps/jazacademy.id/database/migrations').find(f => f.includes('add_social_links_to_users_table'));
const fullPath = 'd:/Libraries/Apps/jazacademy.id/database/migrations/' + file;
let code = fs.readFileSync(fullPath, 'utf8');

code = code.replace(
  '//',
  '$table->string("linkedin")->nullable();\n            $table->string("github")->nullable();\n            $table->string("website")->nullable();'
);

code = code.replace(
  '//',
  '$table->dropColumn(["linkedin", "github", "website"]);'
);

fs.writeFileSync(fullPath, code);
console.log('done');
