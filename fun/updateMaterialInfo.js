const { SupplierDB } = require('../model/supplierdb');

async function updateMaterialInfo() {
    const list = await SupplierDB.find({});
}
updateMaterialInfo()