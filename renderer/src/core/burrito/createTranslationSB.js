import moment from 'moment';
import burrito from '../../lib/BurritoTemplete.json';

const sha1 = require('sha1');

const createTranslationSB = (username, projectName, currentScope, language) => {
  const names = {};
  return new Promise((resolve) => {
    const json = burrito;
    json.meta.generator.userName = username;
    json.identification.primary = {
      ag: {
        [sha1(username + projectName + moment().format())]: {
        revision: '1',
        timestamp: moment().format(),
        },
      },
    };
    json.identification.name.en = projectName;
    json.languages[0].name.en = language;
    currentScope.forEach((scope) => {
      json.type.flavorType.currentScope[scope] = [];
      names[scope] = json.names[scope];
    });
    json.names = names;
    resolve(json);
  });
};
export default createTranslationSB;
