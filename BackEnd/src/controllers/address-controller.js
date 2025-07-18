import AddressModel  from "../models/Address.js";



const getDistrict = async (req, res) => {
  const { province } = req.query;

  try {
    const data = await AddressModel.findOne({ province }); 
    if(!data){
      return res.status(404).json({ message: 'Province not found' });
    }
    const districtNames = data.districts.map(d => d.name);
    res.json({ success: true, districts: districtNames });
  } catch (error) {
    console.error("Error fetching districts:", error);
    res.status(500).json({ error: 'Server Error' });
  }
};

const getCity = async (req, res) => {
  const { district } = req.query; 
  try {
    const data = await AddressModel.findOne({ "districts.name": district }); 

    if (!data) {
      return res.status(404).json({ message: 'District not found' });
    }

    const districtData = data.districts.find(d => d.name === district);

    if (!districtData || !districtData.cities) {
      return res.status(404).json({ message: 'Cities not found for this district' });
    }

    res.json({ success: true, cities: districtData.cities });
  } catch (error) {
    console.error("Error fetching cities:", error);
    res.status(500).json({ error: 'Server Error' });
  }
};


export { getDistrict, getCity };