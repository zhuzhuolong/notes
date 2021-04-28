## SQL规范的目的
通过约定，统一项目中的SQL语句设计编写，从而达到：

1.  提高数据库系统的处理效率
1.  避免数据库不必要的死锁及资源浪费
1.  提高应用系统的数据库升级方便

## SQL语句约定
1.  在MySQL中SQL语句一般不区分大小写，全部小写
1.  sql语句在使用join, 子查询一定先要进行explain确定执行计划
1.  为每个业务收集sql list.

## SQL编写规范

1.  去掉不必要的括号
    ```sql
        如：      ((a AND b) AND c OR (((a AND b) AND (c AND d)))) 
        修改成    (a AND b AND c) OR (a AND b AND c AND d)
    ```
1.  去掉重叠常量
    ```sql
        如：      (a<b AND b=c) AND a=5
        修改成    b>5 AND b=c AND a=5
    ```

1.  去除常量条件(由于常量重叠需要)

    ```sql
        如：      (B>=5 AND B=5) OR (B=6 AND 5=5) OR (B=7 AND 5=6)
        修改成    B=5 OR B=6

        注解 ：但是必须注意 or 两边必须用括号括起来，不然会导致结果不一致
    ```

1.  去掉无意义的连接用条件
2.  开发过程中不使用拼字符串的方式来完成where子句
3.  多使用等值操作，少使用非等值操作
4.  常数表优先，字典表或小表其次，大表最后
5.  减少或避免临时表
6.  where子句中的数据扫描别跨越表的30%
7.  where子句中同一个表的不同的字段组合建议小于等于5组，否则考虑业务逻辑或分表
8.  不使用is null或is not null，字段设计时建议not null，若麻烦可折中考虑给一默认值
9.  使用like时，%不要放在首字符位置。
10. 值域比较多的表字段放在前面
11. 表字段组合中出现比较多的表字段放在前面
12. 表字段不能有表达式或是函数
13. 注意表字段的类型，避免表字段的隐示转换
14. 考虑使用union all，少使用union，注意考虑去重
15. 不同字段的值or或in大于等于3次，考虑用union all替换；同一字段的值or用in替换
16. 用Where子句替换HAVING子句
17. 对同一表的order by和group by操作分别小于3组，否则考虑业务逻辑或分表
18. 尽量使用主键进行update和delete
19. 小心text/blobs等大字段，如果确实不需要这样的大字段，则不用放入sql语句中，避免产生过多额外I/O读。
20. 使用INSERT ... ON DUPLICATE KEY update (INSERT IGNORE)来避免不必要的查询
21. limit N以及limit M,N场景中，不管是M还是N的值都不宜过大（一般不超过一万）。当M（起始值）较大时，建议用延迟关联的方式优化，
22. 减少或避免排序，如：group by语句中如果不需要排序，可以增加order by null
23. 增删改语句中不使用不确定值函数和随机函数，如：RAND()和SYSDATE()等。
24. INSERT语句使用batch提交（INSERT INTO table VALUES(),(),()„„），values的个数不超过500。
25. 避免使用存储过程、触发器、函数、UDF、events等，容易将业务逻辑和DB耦合在一起，并且MySQL的存储过程、触发器、函数、UDF、events中存在一定的bug。
26. 避免使用超过3次的JOIN查询。
27. 使用合理的SQL语句减少与数据库的交互次数。
28. 减少使用视图，避免复杂的语句。
29. SQL语句中IN包含的值尽量不超过200个。
30. UPDATE、DELETE语句不使用LIMIT(binlog格式是statement或是mixed格式时，容易造成主从不一致,binlog_format=row时，请忽略)。有主键id的表WHERE条件应结合主键。
31. 使用prepared statement，可以提供性能并且避免SQL注入。
32. InnoDB表避免使用COUNT(*)操作，计数统计实时要求较强可以使用memcache或者redis，非实时统计可以使用单独统计表，定时更新。
33. 禁止在Update语句，将“,”写成“and”，非常危险。
34. update 语句禁止使用 in ,exists等 尽量使用 join


