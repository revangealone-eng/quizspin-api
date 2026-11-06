   module.exports = (sequelize, DataTypes) =>
     sequelize.define(
       'GameSession',
       {
         session_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
         question_set_id: { type: DataTypes.INTEGER, allowNull: false },
         join_code: { type: DataTypes.STRING(6), allowNull: false, unique: true },
         status: { type: DataTypes.STRING(12), allowNull: false, defaultValue: 'waiting' },
         started_at: { type: DataTypes.DATE, allowNull: true },
         ended_at: { type: DataTypes.DATE, allowNull: true },
       },
       { tableName: 'game_sessions', timestamps: true, createdAt: 'created_at', updatedAt: false }
     );