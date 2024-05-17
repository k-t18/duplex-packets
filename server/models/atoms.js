module.exports = (sequelize, DataTypes) => {
  const Atoms = sequelize.define(
    "Atoms",
    {
      atomicNumber: { type: DataTypes.INTEGER, allowNull: false, unique: true },
      atomicMass: { type: DataTypes.FLOAT, allowNull: false },
      symbol: { type: DataTypes.STRING, allowNull: false },
      name: { type: DataTypes.STRING, allowNull: false },
    },
    {}
  );
  return Atoms;
};
