/*
 Navicat MySQL Data Transfer

 Source Server         : cpc
 Source Server Version : 50529
 Source Host           : localhost
 Source Database       : cpc

 Target Server Version : 50529
 File Encoding         : utf-8

 Date: 10/07/2013 20:16:02 PM
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `cpc_area`
-- ----------------------------
DROP TABLE IF EXISTS `cpc_area`;
CREATE TABLE `cpc_area` (
  `id` tinyint(2) NOT NULL AUTO_INCREMENT,
  `area_name` char(30) NOT NULL COMMENT '区名',
  `ctime` int(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `cpc_city`
-- ----------------------------
DROP TABLE IF EXISTS `cpc_city`;
CREATE TABLE `cpc_city` (
  `id` int(10) NOT NULL,
  `city` varchar(50) CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
--  Records of `cpc_city`
-- ----------------------------
BEGIN;
INSERT INTO `cpc_city` VALUES ('1', '上海市'), ('2', '北京市');
COMMIT;

-- ----------------------------
--  Table structure for `cpc_classify`
-- ----------------------------
DROP TABLE IF EXISTS `cpc_classify`;
CREATE TABLE `cpc_classify` (
  `id` tinyint(2) NOT NULL AUTO_INCREMENT,
  `classname` char(30) NOT NULL,
  `g_nums` int(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=101 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `cpc_classify`
-- ----------------------------
BEGIN;
INSERT INTO `cpc_classify` VALUES ('1', '书籍/学习周边', '1'), ('2', '自行车/生活周边', '0'), ('3', '数码/电子', '21'), ('4', '门票/卡券', '0'), ('100', '其他', '0');
COMMIT;

-- ----------------------------
--  Table structure for `cpc_comments`
-- ----------------------------
DROP TABLE IF EXISTS `cpc_comments`;
CREATE TABLE `cpc_comments` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `uid` int(10) NOT NULL,
  `gid` int(10) NOT NULL,
  `comments` varchar(255) NOT NULL,
  `pid` int(10) NOT NULL,
  `ctime` int(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `cpc_goods`
-- ----------------------------
DROP TABLE IF EXISTS `cpc_goods`;
CREATE TABLE `cpc_goods` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `uid` int(10) NOT NULL,
  `gname` char(16) NOT NULL,
  `gdesc` text COMMENT '物品描述',
  `gprice` int(10) NOT NULL,
  `mobile` int(15) NOT NULL,
  `status` tinyint(1) NOT NULL COMMENT '物品状态',
  `place` varchar(20) NOT NULL DEFAULT '0' COMMENT '交易位置',
  `browser_num` int(10) NOT NULL,
  `classify` tinyint(2) NOT NULL,
  `ctime` int(10) NOT NULL,
  `gpic_url` varchar(100) NOT NULL,
  `gpic_url_small` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=76 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `cpc_goods`
-- ----------------------------
BEGIN;
INSERT INTO `cpc_goods` VALUES ('42', '14', '电力电子技术课本', '就是那节最傻逼的课程', '2', '2147483647', '0', '4', '0', '1', '1380792075', 'media/market/2013/10/138079207446273676.jpg', 'media/market/2013/10/138079207446273676_small.jpg'), ('43', '14', '电力电子技术课本2', '就是那节最傻逼的课程', '2', '2147483647', '0', '4', '0', '1', '1380792096', 'media/market/2013/10/138079209570730748.jpg', 'media/market/2013/10/138079209570730748_small.jpg'), ('44', '14', '高数上', '谁要谁拿走 反正我是不想再看到它了', '1', '2147483647', '0', '2', '0', '1', '1380792338', 'media/market/2013/10/138079233727090702.jpg', 'media/market/2013/10/138079233727090702_small.jpg'), ('39', '14', 'iphone手机充电器', '老式的iphone手机充电器', '30', '2147483647', '0', '4', '0', '3', '1380785197', 'media/market/2013/10/138078519629668545.jpg', 'media/market/2013/10/138078519629668545_small.jpg'), ('40', '14', 'android手机一部', 'htc最烂的手机之一～～～', '100', '2147483647', '0', '2', '0', '3', '1380791907', 'media/market/2013/10/1380791906857927.png', 'media/market/2013/10/1380791906857927_small.png'), ('41', '14', '齐白石字画', 'htc最烂的手机之一～～～', '10000', '2147483647', '0', '4', '0', '1', '1380791981', 'media/market/2013/10/138079198088492980.jpg', 'media/market/2013/10/138079198088492980_small.jpg'), ('45', '14', '高数下', '谁要谁拿走 反正我是不想再看到它了', '1', '2147483647', '0', '4', '0', '1', '1380792425', 'media/market/2013/10/138079242456617606.jpg', 'media/market/2013/10/138079242456617606_small.jpg'), ('46', '14', '高数下', '谁要谁拿走 反正我是不想再看到它了', '1', '2147483647', '0', '4', '0', '1', '1380792443', 'media/market/2013/10/138079244204364701.jpg', 'media/market/2013/10/138079244204364701_small.jpg'), ('47', '14', '线性代数', '谁要谁拿走 反正我是不想再看到它了', '1', '2147483647', '0', '4', '0', '1', '1380792541', 'media/market/2013/10/138079254083737298.jpg', 'media/market/2013/10/138079254083737298_small.jpg'), ('48', '14', '线性代数', '谁要谁拿走 反正我是不想再看到它了', '1', '2147483647', '0', '4', '0', '1', '1380792560', 'media/market/2013/10/13807925594023318.jpg', 'media/market/2013/10/13807925594023318_small.jpg'), ('49', '14', '代数', '谁要谁拿走 反正我是不想再看到它了', '1', '2147483647', '0', '2', '0', '1', '1380792576', 'media/market/default/default.jpg', 'media/market/default/default_small.jpg'), ('50', '14', '代数', '谁要谁拿走 反正我是不想再看到它了', '1', '2147483647', '0', '4', '0', '1', '1380792603', 'media/market/2013/10/138079260207590233.jpg', 'media/market/2013/10/138079260207590233_small.jpg'), ('51', '14', '代数111', '谁要谁拿走 反正我是不想再看到它了', '1', '2147483647', '0', '4', '0', '1', '1380792620', 'media/market/2013/10/138079261928725467.jpg', 'media/market/2013/10/138079261928725467_small.jpg'), ('52', '14', '代数111', '谁要谁拿走 反正我是不想再看到它了', '1', '2147483647', '0', '4', '0', '1', '1380794446', 'media/market/2013/10/13807944455968113.jpg', 'media/market/2013/10/13807944455968113_small.jpg'), ('53', '14', '代数111', '谁要谁拿走 反正我是不想再看到它了', '1', '2147483647', '0', '4', '0', '1', '1380794507', 'media/market/2013/10/13807945067253100.jpg', 'media/market/2013/10/13807945067253100_small.jpg'), ('54', '14', '代数111', '谁要谁拿走 反正我是不想再看到它了', '1', '2147483647', '0', '2', '0', '1', '1380794563', 'media/market/2013/10/138079456280979589.jpg', 'media/market/2013/10/138079456280979589_small.jpg'), ('55', '14', 'test', '123123', '123', '2147483647', '0', '1', '0', '3', '1381118241', 'media/market/2013/10/138111824016655016.jpg', 'media/market/2013/10/138111824016655016_small.jpg'), ('56', '14', 'test10', '123123', '123', '2147483647', '0', '1', '0', '3', '1381118261', 'media/market/2013/10/138111826060073698.jpg', 'media/market/2013/10/138111826060073698_small.jpg'), ('57', '14', 'test11', '123123', '123', '2147483647', '0', '1', '0', '3', '1381118270', 'media/market/2013/10/138111826964040047.jpg', 'media/market/2013/10/138111826964040047_small.jpg'), ('58', '14', 'test12', '123123', '123', '2147483647', '0', '4', '0', '3', '1381118282', 'media/market/2013/10/138111828157211638.jpg', 'media/market/2013/10/138111828157211638_small.jpg'), ('59', '14', 'test13', '123123', '123', '2147483647', '0', '4', '0', '3', '1381118292', 'media/market/2013/10/138111829154615569.jpg', 'media/market/2013/10/138111829154615569_small.jpg'), ('60', '14', 'test14', '123123', '123', '2147483647', '0', '5', '0', '3', '1381118307', 'media/market/2013/10/138111830685062887.jpg', 'media/market/2013/10/138111830685062887_small.jpg'), ('61', '14', 'test15', '123123', '123', '2147483647', '0', '3', '0', '3', '1381118318', 'media/market/2013/10/138111831733796908.jpg', 'media/market/2013/10/138111831733796908_small.jpg'), ('62', '14', 'test16', '123123', '123', '2147483647', '0', '6', '0', '3', '1381118328', 'media/market/2013/10/138111832792752782.jpg', 'media/market/2013/10/138111832792752782_small.jpg'), ('63', '14', 'test17', '123123', '123', '2147483647', '0', '8', '0', '3', '1381118341', 'media/market/2013/10/138111834047917935.jpg', 'media/market/2013/10/138111834047917935_small.jpg'), ('64', '14', 'test18', '123123', '123', '2147483647', '0', '3', '0', '3', '1381118350', 'media/market/2013/10/13811183490082567.jpg', 'media/market/2013/10/13811183490082567_small.jpg'), ('65', '14', 'test19', '123123', '123', '2147483647', '0', '3', '0', '3', '1381118353', 'media/market/2013/10/138111835261049654.jpg', 'media/market/2013/10/138111835261049654_small.jpg'), ('66', '14', 'test20', '123123', '123', '2147483647', '0', '3', '0', '3', '1381118358', 'media/market/2013/10/138111835770080260.jpg', 'media/market/2013/10/138111835770080260_small.jpg'), ('67', '14', 'test20', '123123', '123', '2147483647', '0', '4', '0', '3', '1381118434', 'media/market/2013/10/13811184334162375.jpg', 'media/market/2013/10/13811184334162375_small.jpg'), ('68', '14', 'test20', '123123', '123', '2147483647', '0', '4', '0', '3', '1381118436', 'media/market/2013/10/138111843579718885.jpg', 'media/market/2013/10/138111843579718885_small.jpg'), ('69', '14', 'test20', '123123', '123', '2147483647', '0', '4', '0', '3', '1381118438', 'media/market/2013/10/138111843737723903.jpg', 'media/market/2013/10/138111843737723903_small.jpg'), ('70', '14', 'test20', '123123', '123', '2147483647', '0', '4', '0', '3', '1381118439', 'media/market/2013/10/138111843896833289.jpg', 'media/market/2013/10/138111843896833289_small.jpg'), ('71', '14', 'test20', '123123', '123', '2147483647', '0', '4', '0', '3', '1381118441', 'media/market/2013/10/138111844078970894.jpg', 'media/market/2013/10/138111844078970894_small.jpg'), ('72', '14', 'test20', '123123', '123', '2147483647', '0', '4', '0', '3', '1381118443', 'media/market/2013/10/138111844235791762.jpg', 'media/market/2013/10/138111844235791762_small.jpg'), ('73', '14', 'test20', '123123', '123', '2147483647', '0', '4', '0', '3', '1381118445', 'media/market/2013/10/138111844418291242.jpg', 'media/market/2013/10/138111844418291242_small.jpg'), ('74', '14', 'test20', '123123', '123', '2147483647', '0', '4', '0', '3', '1381118446', 'media/market/2013/10/138111844580010664.jpg', 'media/market/2013/10/138111844580010664_small.jpg'), ('75', '14', 'test20', '123123', '123', '2147483647', '0', '4', '0', '3', '1381118448', 'media/market/2013/10/138111844734696414.jpg', 'media/market/2013/10/138111844734696414_small.jpg');
COMMIT;

-- ----------------------------
--  Table structure for `cpc_pics`
-- ----------------------------
DROP TABLE IF EXISTS `cpc_pics`;
CREATE TABLE `cpc_pics` (
  `id` int(10) unsigned NOT NULL,
  `pic_url` char(30) NOT NULL,
  `ctime` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `cpc_schools`
-- ----------------------------
DROP TABLE IF EXISTS `cpc_schools`;
CREATE TABLE `cpc_schools` (
  `id` smallint(5) NOT NULL AUTO_INCREMENT,
  `school_name` char(30) NOT NULL,
  `area` int(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=64 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `cpc_schools`
-- ----------------------------
BEGIN;
INSERT INTO `cpc_schools` VALUES ('1', '复旦大学', '1'), ('2', '同济大学', '1'), ('3', '上海交通大学', '1'), ('4', '华东理工大学', '1'), ('5', '东华大学', '1'), ('6', '华东师范大学', '1'), ('7', '上海外国语大学', '1'), ('8', '上海财经大学', '1'), ('9', '上海大学', '1'), ('10', '上海理工大学', '1'), ('11', '上海海事大学', '1'), ('12', '上海工程技术大学', '1'), ('13', '上海海洋大学', '1'), ('14', '上海中医药大学', '1'), ('15', '上海师范大学', '1'), ('16', '华东政法大学', '1'), ('17', '上海海关学院', '1'), ('18', '上海建桥学院', '1'), ('19', '上海政法学院', '1'), ('20', '上海电机学院', '1'), ('21', '上海第二工业大学', '1'), ('22', '上海电力学院', '1'), ('23', '上海应用技术大学', '1'), ('24', '上海对外贸易学院', '1'), ('25', '上海立信会计学院', '1'), ('26', '上海金融学院', '1'), ('27', '上海商学院', '1'), ('28', '上海体育学院', '1'), ('29', '上海音乐学院', '1'), ('30', '上海戏剧学院', '1'), ('31', '上海杉达大学', '1'), ('32', '上海出版印刷高等专科学校', '1'), ('33', '上海医疗器械高等专科学校', '1'), ('34', '上海医药高等专科学校', '1'), ('35', '上海旅游高等专科学校', '1'), ('36', '上海公安高等专科学校', '1'), ('37', '上海民航职业技术学院', '1'), ('38', '上海电影艺术职业学院', '1'), ('39', '上海健康职业技术学院', '1'), ('40', '上海东海职业技术学院', '1'), ('41', '上海新侨职业技术学院', '1'), ('42', '上海工会管理职业学院', '1'), ('43', '上海工艺美术职业学院', '1'), ('44', '上海震旦职业学院', '1'), ('45', '上海立达职业技术学院', '1'), ('46', '上海中华职业技术学院', '1'), ('47', '上海兴韦信息技术职业学院', '1'), ('48', '上海邦德职业技术学院', '1'), ('49', '上海农林职业技术学院', '1'), ('50', '上海思博职业技术学院', '1'), ('51', '上海欧华职业技术学院', '1'), ('52', '上海民远职业技术学院', '1'), ('53', '上海交通职业技术学院', '1'), ('54', '上海建峰职业技术学院', '1'), ('55', '上海城市管理职业技术学院', '1'), ('56', '上海体育职业学院', '1'), ('57', '上海电子信息职业技术学院', '1'), ('58', '上海行健职业学院', '1'), ('59', '上海济光职业技术学院', '1'), ('60', '上海工商外国语职业学院', '1'), ('61', '上海海事职业技术学院', '1'), ('62', '上海科学技术职业学院', '1'), ('63', '上海中侨职业技术学院', '1');
COMMIT;

-- ----------------------------
--  Table structure for `cpc_session`
-- ----------------------------
DROP TABLE IF EXISTS `cpc_session`;
CREATE TABLE `cpc_session` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `sid` char(32) NOT NULL,
  `username` char(16) NOT NULL,
  `uid` int(10) unsigned NOT NULL,
  `uavatar` varchar(100) NOT NULL,
  `schoolid` int(10) unsigned NOT NULL,
  `schoolname` varchar(100) NOT NULL,
  `ctime` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `cpc_user`
-- ----------------------------
DROP TABLE IF EXISTS `cpc_user`;
CREATE TABLE `cpc_user` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `username` char(16) NOT NULL,
  `email` char(100) NOT NULL,
  `password` char(32) NOT NULL,
  `ip` char(15) NOT NULL,
  `ctime` int(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=25 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `cpc_user`
-- ----------------------------
BEGIN;
INSERT INTO `cpc_user` VALUES ('24', 'kevin14', 'kevin14@me.com', '01e481f378f913e5eaa2b1cb09a0c19e', '127.0.0.1', '1378793289');
COMMIT;

-- ----------------------------
--  Table structure for `cpc_userinfo`
-- ----------------------------
DROP TABLE IF EXISTS `cpc_userinfo`;
CREATE TABLE `cpc_userinfo` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `uavatar` varchar(255) NOT NULL,
  `schoolId` smallint(5) DEFAULT NULL,
  `gender` tinyint(1) DEFAULT NULL,
  `ctime` int(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `cpc_userinfo`
-- ----------------------------
BEGIN;
INSERT INTO `cpc_userinfo` VALUES ('5', '', null, null, '0'), ('6', '', null, null, '0'), ('7', '', null, null, '0'), ('8', '', null, null, '0'), ('9', 'http://localhost:3000/media/market/2013/8/avatar.jpg', '0', '3', '1376969593'), ('10', 'http://localhost:3000/media/market/2013/8/avatar.jpg', '0', '3', '1378784702'), ('11', 'http://localhost:3000/media/market/2013/8/avatar.jpg', '0', '3', '1378785459'), ('12', 'http://localhost:3000/media/market/2013/8/avatar.jpg', '0', '3', '1378785669'), ('13', 'http://localhost:3000/media/market/2013/8/avatar.jpg', '0', '3', '1378791940'), ('14', 'http://localhost:3000/media/market/2013/8/avatar.jpg', '0', '3', '1378792667'), ('15', 'http://localhost:3000/media/market/2013/8/avatar.jpg', '0', '3', '1378792711'), ('16', 'http://localhost:3000/media/market/2013/8/avatar.jpg', '0', '3', '1378792774'), ('17', 'http://localhost:3000/media/market/2013/8/avatar.jpg', '0', '3', '1378792937'), ('18', 'http://localhost:3000/media/market/2013/8/avatar.jpg', '0', '3', '1378792973'), ('19', 'http://localhost:3000/media/market/2013/8/avatar.jpg', '0', '3', '1378793289');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
