/**
Schema for a patient.
 */

module.exports = (sequelize, Sequelize) => {
	const Patient = sequelize.define('patients', {
	  firstname: {
		  type: Sequelize.STRING
	  },
	  surname: {
		  type: Sequelize.STRING
	  },
	  dateOfBirth: {
		  type: Sequelize.DATEONLY
	  },
	  sex: {
		  type: Sequelize.STRING
	  },
    PESEL: {
		  type: Sequelize.STRING
	  }
	});
	
	return Patient;
}