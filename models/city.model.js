const Model = require('sequelize').Model;
const moment = require('moment');
const _ = require('lodash');
const sequelize = require('sequelize');
const Op = sequelize.Op;
const {
    CITY,
    YYYY_MM_DD,
    NO_DATA
} = require(`${__base}/helpers/enums`);

module.exports = (sequelize, DataTypes) => {

    class City extends Model {

        static associate(models) {
            City.hasMany(models.Weather, {
                as: 'weather',
                foreignKey: 'city_id'
            })
        }

        render(dayNow, firsDayOfWeek) {
            const dateNow = Date.now();

            const todayData = this.weather
                .find( t => moment(t.date).format(YYYY_MM_DD) === dayNow);
            const today = _.get(todayData, 'temperature', NO_DATA);

            const yesterdayDate = moment(dateNow).subtract(1, 'days').format(YYYY_MM_DD);
            const yesterdayData = this.weather
                .find( t => moment(t.date).format(YYYY_MM_DD) === yesterdayDate );
            const yesterday = _.get(yesterdayData, 'temperature', NO_DATA);

            const currentWeekData = this.weather
                .filter( day => {
                    const date = moment( day.date ).format(YYYY_MM_DD);
                    return moment( date ).isBetween( firsDayOfWeek, dayNow,  undefined, [] )
                } )
            const weekAverage = currentWeekData.reduce( (sum, item) => sum + item.temperature, 0);

            return {
                today,
                yesterday,
                ['week-average']: weekAverage / currentWeekData.length || NO_DATA
            }
        }
    }

    City.init({
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        city_name: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
        },
    }, {
        sequelize,
        scopes: {
            withTemperature(cityName, dayNow, firsDayOfData) {
                console.log(dayNow, firsDayOfData);
                return {
                    where: {
                        city_name:  cityName,
                    },
                    include: [
                        {
                            association: City.associations.weather,
                            required: false,
                            as: 'weather',
                            attributes: [
                                'date',
                                'temperature'
                            ],
                            where: {
                                date: {
                                    [Op.between]: [firsDayOfData, dayNow]
                                }
                            }
                        }
                    ]
                }
            }
        },
        tableName: CITY,
        timestamps: false,
    })

    return City;
};