const service = require('../service/label.service')
const verifyLabelExists = async (ctx, next) => {
    //取出要添加的所有标签
    const {labels} = ctx.request.body;
    const newLabels = [];
    //判断一个标签在label表中是否存在
    for(let name of labels ){
        const labelResult = await service.getLabelsByName(name)
        const label = {name};
        if(!labelResult){
            //创建标签数据
            const res = await service.creat(name)
            label.id = res.insertId;
        }else{
            label.id = labelResult.id;
        }
       newLabels.push(label);
    }
    ctx.labels = newLabels;
    
    await next();
}

module.exports ={
    verifyLabelExists
}