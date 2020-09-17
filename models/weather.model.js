const Model = require('sequelize').Model;
const moment = require('moment');
const {
    CITY_WEATHER,
    YYYY_MM_DD
} = require(`${__base}/helpers/enums`);

module.exports = (sequelize, DataTypes) => {
    class Weather extends Model {

        static associate(models) {
            Weather.hasOne(models.City, {
                as: 'city',
                foreignKey: 'id'
            })
        }

    }

    Weather.init({
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        city_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
            get() {
                return moment(this.getDataValue('date')).format(YYYY_MM_DD);
            },
        },
        temperature: {
            type: DataTypes.REAL,
        },
    }, {
        sequelize,
        tableName: CITY_WEATHER,
        timestamps: false,
    })

    return Weather;
};