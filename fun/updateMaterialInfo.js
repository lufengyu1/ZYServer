const { SupplierDB } = require('../model/supplierdb');

async function updateMaterialInfo() {
    const list = await SupplierDB.find({});
    console.log(list);
}
updateMaterialInfo()