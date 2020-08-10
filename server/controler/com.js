const { LOGIN_DURATION, OVERDUE_RES, SSVIP_EMAIL } = require('./constant');
const sitedb = require('../model/currentDbs')

const {
	isLegal,
	isLegalExps,
	getStrChartLen,
	fromatIOSDate
} = require('../model/common.js')

const success = (result, msg='success', params={}) => {
	return {
		resultCode: 200,
		resultMessage: msg,
		result,
		...params
	}
}
const failed = (result, msg='failed', params={}) => {
	// result && console.log(result);
	return {
		resultCode: 111,
		resultMessage: msg,
		result,
		...params
	}
}
exports.success = success;
exports.failed = failed;

const checkToken = (req, res) => {
	// console.log(req.session.token, ',', req.cookies.sessionCookie)
	const isOk = req.session.token === req.cookies.sessionCookie
	if (!isOk) {
		res.json(failed('', 'token失效, 请刷新页面！'))
	}
	return isOk;
}

// 用回调的形式，看是否
exports.prevCheck = (req, res) => {
	/*if (!checkToken(req, res)) {
		return false;
	}*/
	// sitedb.response = res;
	return true;
}
exports.checkLegal = (res, str, ptn) => {
	const ok = isLegal(str)
	if (!ok) {
		res.json(failed('', ptn + ' Illegitimate'));
	}
	return ok;
}
exports.checkLegalExps = (res, str, ptn) => {
	const ok = isLegalExps(str)
	if (!ok) {
		res.json(failed('', ptn + ' Illegitimate'));
	}
	return ok;
}


exports.getCode = (count=6) => {
	let code = '';
	for (let i = 0; i < count; i++) {
		code += Math.floor(Math.random() * 36).toString(36)
	}
	return code;
}

exports.checkPsw = (psw='') => {
	const pswlen = psw.length
	const pswstrlen = getStrChartLen(psw);
	const ok1 = pswstrlen <= 14 && pswstrlen >= 8
	const ok2 = /(?=.*[a-zA-Z0-9])(?=.*[^a-zA-Z0-9]).{2,14}/.test(psw)
	const ok3 = pswlen > 0 && !(/[\s\u4e00-\u9fa5]/.test(psw))
	return ok1 && ok2 && ok3
}

/*exports.isSuperVip = async (req, res) => {
	const ust = checkUserLogin(req, res);
	if (!ust) {
		return false;
	}
	const { _id: user_id } = ust;
	const [user] = await sitedb.find('users', {_id: user_id})
	const { is_super, email } = user;
	if (!is_super || email !== SSVIP_EMAIL) {
		res.json(failed('', 'Insufficient authority !'));
		return false
	}
	return ust;
}*/