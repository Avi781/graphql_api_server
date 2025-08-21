import fs from 'fs';
import path from 'path';
import url from 'url';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const dataDir = path.resolve(__dirname, '..', 'data');

function loadJson(name) {
  const fp = path.join(dataDir, name);
  if (!fs.existsSync(fp)) return [];
  return JSON.parse(fs.readFileSync(fp, 'utf-8'));
}

const data = {
  actions: loadJson('action.json'),
  responses: loadJson('response.json'),
  triggers: loadJson('trigger.json'),
  nodes: loadJson('node.json'),
  resourceTemplates: loadJson('resourceTemplate.json'),
};

// Build indexes for quick lookup
const indexById = (arr) => {
  const map = new Map();
  for (const item of arr) {
    if (item && item._id) map.set(String(item._id), item);
  }
  return map;
};

export const db = {
  ...data,
  idx: {
    action: indexById(data.actions),
    response: indexById(data.responses),
    trigger: indexById(data.triggers),
    node: indexById(data.nodes),
    resourceTemplate: indexById(data.resourceTemplates),
  },
};

export function getNodeByAnyId(id) {
  if (!id) return null;
  const strId = String(id);

  // try _id
  if (db.idx.node.has(strId)) return db.idx.node.get(strId);

  // try compositeId
  const byComposite = db.nodes.find(n => String(n.compositeId || '') === strId);
  return byComposite || null;
}
