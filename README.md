

## UI组件
```shell
https://akveo.github.io/react-native-ui-kitten/docs/guides/getting-started#manual-installation
```

```typescript jsx
 <ScrollView style={styles.scrollView}>
    {/* 欢迎卡片 */}
    <Card style={styles.card} status='primary'>
        <View style={styles.cardHeader}>
            <Avatar
                source={{uri: 'https://i.pravatar.cc/150?img=3'}}
                style={styles.avatar}
            />
            <View style={styles.cardHeaderText}>
                <Text category='h6'>欢迎使用 UI Kitten</Text>
                <Text category='c1' appearance='hint'>简洁美观的组件库</Text>
            </View>
        </View>

        <Divider style={styles.divider}/>

        <Text category='p1' style={styles.cardContent}>
            UI Kitten 是一个基于 Eva Design System 的 React Native UI 框架，
            提供 30+ 个精美的组件，支持自定义主题和暗黑模式。
        </Text>
    </Card>

    {/* 表单示例 */}
    <Layout style={styles.section} level='2'>
        <Text category='h6' style={styles.sectionTitle}>表单控件</Text>

        <Input
            placeholder='请输入邮箱'
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            accessoryLeft={EmailIcon}
        />

        <Input
            placeholder='请输入密码'
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
            accessoryLeft={PersonIcon}
        />

        <View style={styles.row}>
            <Toggle
                checked={checked}
                onChange={setChecked}
            >
                <Text>记住密码</Text>
            </Toggle>

            {checked && (
                <View style={styles.row}>
                    <Spinner size='tiny'/>
                    <Text category='c1' style={styles.hintText}>已启用</Text>
                </View>
            )}
        </View>
    </Layout>

    {/* 按钮示例 */}
    <Layout style={styles.section} level='2'>
        <Text category='h6' style={styles.sectionTitle}>按钮类型</Text>

        <View style={styles.buttonGroup}>
            <Button
                status='primary'
                style={styles.button}
                onPress={() => console.log('主要按钮')}
            >
                主要按钮
            </Button>

            <Button
                status='success'
                appearance='outline'
                style={styles.button}
                onPress={() => console.log('成功按钮')}
            >
                轮廓按钮
            </Button>

            <Button
                status='warning'
                appearance='ghost'
                style={styles.button}
                onPress={() => console.log('警告按钮')}
            >
                幽灵按钮
            </Button>

            <Button
                status='danger'
                appearance='filled'
                disabled
                style={styles.button}
                onPress={() => console.log('危险按钮')}
            >
                禁用按钮
            </Button>
        </View>
    </Layout>

    {/* 状态卡片 */}
    <View style={styles.row}>
        <Card style={[styles.statusCard, {marginRight: 10}]} status='success'>
            <Text category='h2' style={styles.statusNumber}>12</Text>
            <Text category='c1'>进行中</Text>
        </Card>

        <Card style={[styles.statusCard, {marginLeft: 10}]} status='info'>
            <Text category='h2' style={styles.statusNumber}>5</Text>
            <Text category='c1'>已完成</Text>
        </Card>
    </View>

</ScrollView>

{/* 底部操作栏 */}
<Layout style={styles.footer} level='2'>
    <Button
        style={styles.footerButton}
        onPress={() => console.log('开始使用')}
    >
        立即开始
    </Button>
</Layout>
```