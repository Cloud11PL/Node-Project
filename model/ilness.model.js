module.exports = (sequelize, Sequelize) => {
	const Ilness = sequelize.define('ilness', {
	  ilness: {
		  type: Sequelize.STRING
	  },
	  present: {
		  type: Sequelize.BOOLEAN
	  },
      patientID: {
		  type: Sequelize.INTEGER
	  }
    });
	
	return Ilness;
}