import { db } from '../data_db.js';

export default {
  parents: (parent) => {
    const ids = Array.isArray(parent.parents)
      ? parent.parents
      : Array.isArray(parent.parentIds)
        ? parent.parentIds
        : [];
    return ids.map((id) => db.idx.node.get(String(id))).filter(Boolean);
  },

  parentIds: (parent) => {
    if (Array.isArray(parent.parentIds)) return parent.parentIds;
    if (Array.isArray(parent.parents)) return parent.parents;
    return [];
  },

  triggerId: (parent) => parent.trigger || parent.triggerId || null,
  trigger: (parent) => {
    const id = parent.trigger || parent.triggerId;
    return id ? db.idx.trigger.get(String(id)) : null;
  },
  
  responseIds: (parent) => parent.responses || parent.responseIds || [],
  responses: (parent) => {
    const ids = parent.responses || parent.responseIds || [];
    return ids.map((id) => db.idx.response.get(String(id))).filter(Boolean);
  },

  // ✅ FIX for single string, array, or legacy "action"
  actionIds: (parent) => {
    if (Array.isArray(parent.actionIds)) return parent.actionIds;
    if (Array.isArray(parent.actions)) return parent.actions;
    if (typeof parent.actions === 'string') return [parent.actions];
    if (parent.action) return [parent.action];
    return [];
  },

  actions: (parent) => {
    const ids = [];
    if (Array.isArray(parent.actionIds)) ids.push(...parent.actionIds);
    if (Array.isArray(parent.actions)) ids.push(...parent.actions);
    if (typeof parent.actions === 'string') ids.push(parent.actions);
    if (parent.action) ids.push(parent.action);
    return ids.map((id) => db.idx.action.get(String(id))).filter(Boolean);
  },
};
