module.exports = function foreignKey(fromTable, toTable) {
  return {
    type: 'int',
    unsigned: true,
    length: 10,
    foreignKey: {
      name: `fk_${fromTable}_${toTable}`,
      table: toTable,
      mapping: 'id',
      rules: {
        onDelete: 'CASCADE',
        onUpdate: 'RESTRICT'
      }
    }
  };
}
