/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50524
Source Host           : localhost:3306
Source Database       : cpc

Target Server Type    : MYSQL
Target Server Version : 50524
File Encoding         : 65001

Date: 2013-09-10 17:53:45
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `cpc_area`
-- ----------------------------
DROP TABLE IF EXISTS `cpc_area`;
CREATE TABLE `cpc_area` (
  `id` tinyint(2) NOT NULL AUTO_INCREMENT,
  `area_name` char(30) NOT NULL COMMENT '区名',
  `ctime` int(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cpc_area
-- ----------------------------

-- ----------------------------
-- Table structure for `cpc_classify`
-- ----------------------------
DROP TABLE IF EXISTS `cpc_classify`;
CREATE TABLE `cpc_classify` (
  `id` tinyint(2) NOT NULL AUTO_INCREMENT,
  `classname` char(30) NOT NULL,
  `g_nums` int(10) NOT NULL,
  `ctime` int(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cpc_classify
-- ----------------------------

-- ----------------------------
-- Table structure for `cpc_comments`
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
-- Records of cpc_comments
-- ----------------------------

-- ----------------------------
-- Table structure for `cpc_goods`
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
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cpc_goods
-- ----------------------------
INSERT INTO `cpc_goods` VALUES ('1', '14', '222', '222', '222', '222', '0', '222', '0', '127', '1373350930');
INSERT INTO `cpc_goods` VALUES ('2', '14', '', '', '0', '0', '0', '', '0', '0', '1373353830');
INSERT INTO `cpc_goods` VALUES ('3', '14', '', '', '0', '0', '0', '华东理工大学', '0', '0', '1373610567');
INSERT INTO `cpc_goods` VALUES ('4', '14', '', '', '0', '0', '0', '华东理工大学', '0', '0', '1373610684');
INSERT INTO `cpc_goods` VALUES ('5', '14', '', '', '0', '0', '0', '华东理工大学', '0', '0', '1373610934');
INSERT INTO `cpc_goods` VALUES ('6', '14', '', '', '0', '0', '0', '华东理工大学', '0', '0', '1373611007');
INSERT INTO `cpc_goods` VALUES ('7', '14', '', '', '0', '0', '0', '华东理工大学', '0', '0', '1373611043');
INSERT INTO `cpc_goods` VALUES ('8', '14', '', '', '0', '0', '0', '华东理工大学', '0', '0', '1373611191');
INSERT INTO `cpc_goods` VALUES ('9', '14', '', '', '0', '0', '0', '华东理工大学', '0', '0', '1373611215');
INSERT INTO `cpc_goods` VALUES ('10', '14', '', '', '0', '0', '0', '华东理工大学', '0', '0', '1373611975');
INSERT INTO `cpc_goods` VALUES ('11', '14', '', '', '0', '0', '0', '华东理工大学', '0', '0', '1373612364');
INSERT INTO `cpc_goods` VALUES ('12', '14', '', '', '0', '0', '0', '华东理工大学', '0', '0', '1373612376');
INSERT INTO `cpc_goods` VALUES ('13', '14', '', '', '0', '0', '0', '华东理工大学', '0', '0', '1373612386');
INSERT INTO `cpc_goods` VALUES ('14', '14', '', '', '0', '0', '0', '华东理工大学', '0', '0', '1373612766');
INSERT INTO `cpc_goods` VALUES ('15', '14', '', '', '0', '0', '0', '华东理工大学', '0', '0', '1373613499');
INSERT INTO `cpc_goods` VALUES ('16', '14', '', '', '0', '0', '0', '华东理工大学', '0', '0', '1373613506');
INSERT INTO `cpc_goods` VALUES ('17', '14', '', '', '0', '0', '0', '华东理工大学', '0', '0', '1373613515');
INSERT INTO `cpc_goods` VALUES ('18', '14', '', '', '0', '0', '0', '华东理工大学', '0', '0', '1373614247');
INSERT INTO `cpc_goods` VALUES ('19', '14', '', '', '0', '0', '0', '华东理工大学', '0', '0', '1373614394');
INSERT INTO `cpc_goods` VALUES ('20', '14', '', '', '0', '0', '0', '华东理工大学', '0', '0', '1373615349');

-- ----------------------------
-- Table structure for `cpc_pics`
-- ----------------------------
DROP TABLE IF EXISTS `cpc_pics`;
CREATE TABLE `cpc_pics` (
  `id` int(10) unsigned NOT NULL,
  `pic_url` char(30) NOT NULL,
  `ctime` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cpc_pics
-- ----------------------------

-- ----------------------------
-- Table structure for `cpc_schools`
-- ----------------------------
DROP TABLE IF EXISTS `cpc_schools`;
CREATE TABLE `cpc_schools` (
  `id` smallint(5) NOT NULL AUTO_INCREMENT,
  `school_name` char(30) NOT NULL,
  `area` tinyint(2) NOT NULL COMMENT '所属的地区 如同location',
  `ctime` int(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cpc_schools
-- ----------------------------

-- ----------------------------
-- Table structure for `cpc_session`
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
-- Records of cpc_session
-- ----------------------------

-- ----------------------------
-- Table structure for `cpc_user`
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
-- Records of cpc_user
-- ----------------------------
INSERT INTO `cpc_user` VALUES ('24', 'kevin14', 'kevin14@me.com', '01e481f378f913e5eaa2b1cb09a0c19e', '127.0.0.1', '1378793289');

-- ----------------------------
-- Table structure for `cpc_userinfo`
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
-- Records of cpc_userinfo
-- ----------------------------
INSERT INTO `cpc_userinfo` VALUES ('5', '', null, null, '0');
INSERT INTO `cpc_userinfo` VALUES ('6', '', null, null, '0');
INSERT INTO `cpc_userinfo` VALUES ('7', '', null, null, '0');
INSERT INTO `cpc_userinfo` VALUES ('8', '', null, null, '0');
INSERT INTO `cpc_userinfo` VALUES ('9', 'http://localhost:3000/media/market/2013/8/avatar.jpg', '0', '3', '1376969593');
INSERT INTO `cpc_userinfo` VALUES ('10', 'http://localhost:3000/media/market/2013/8/avatar.jpg', '0', '3', '1378784702');
INSERT INTO `cpc_userinfo` VALUES ('11', 'http://localhost:3000/media/market/2013/8/avatar.jpg', '0', '3', '1378785459');
INSERT INTO `cpc_userinfo` VALUES ('12', 'http://localhost:3000/media/market/2013/8/avatar.jpg', '0', '3', '1378785669');
INSERT INTO `cpc_userinfo` VALUES ('13', 'http://localhost:3000/media/market/2013/8/avatar.jpg', '0', '3', '1378791940');
INSERT INTO `cpc_userinfo` VALUES ('14', 'http://localhost:3000/media/market/2013/8/avatar.jpg', '0', '3', '1378792667');
INSERT INTO `cpc_userinfo` VALUES ('15', 'http://localhost:3000/media/market/2013/8/avatar.jpg', '0', '3', '1378792711');
INSERT INTO `cpc_userinfo` VALUES ('16', 'http://localhost:3000/media/market/2013/8/avatar.jpg', '0', '3', '1378792774');
INSERT INTO `cpc_userinfo` VALUES ('17', 'http://localhost:3000/media/market/2013/8/avatar.jpg', '0', '3', '1378792937');
INSERT INTO `cpc_userinfo` VALUES ('18', 'http://localhost:3000/media/market/2013/8/avatar.jpg', '0', '3', '1378792973');
INSERT INTO `cpc_userinfo` VALUES ('19', 'http://localhost:3000/media/market/2013/8/avatar.jpg', '0', '3', '1378793289');
