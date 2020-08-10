const path = require('path');



const MAIL_MAX_COUNT = 5;

const REG_CODE_EXP = 30 * 60 * 1000;
const IMG_DIR = path.join(__dirname, '../../../online-images/images')

// const RET = 'shhhhh';

// 秒
const LOGIN_DURATION = 60 * 120
const SSVIP_EMAIL = '778007921@qq.com'
const superEmail = [SSVIP_EMAIL]
const LOG_OVERDUE_CODE = 233;

module.exports = {
	MAX_SITE_IMG: 1,	// 网站封面图最大1m
	LOG_OVERDUE_CODE,
	OVERDUE_RES: {resultCode: LOG_OVERDUE_CODE},
	SSVIP_EMAIL, 
	REG_CODE_EXP,
	superEmail,
	MAIL_MAX_COUNT,
	LOGIN_DURATION,
	MAX_NAME_CHART: 14,	// 名字最多14个字符
	ONE_DAY_MAX_ADD: 5,	// 每日新增最多5条
	MAX_SIT_DESC: 600,		// 文字个数,前端为400，多的200是各种标签
	REGISTER_CODE: 'REGISTER_CODE',
	RESET_PASSWORD_CODE: 'RESET_PASSWORD_CODE',
	IMG_DIR
}