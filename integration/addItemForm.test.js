
describe('AddItemForm', () => {
    it('base example, visually looks correct', async () => {


        await page.goto("http://localhost:6006/iframe.html?args=&id=additemform--add-item-form-default&viewMode=story")


        const image = await page.screenshot()


        expect(image).toMatchImageSnapshot()
    })
})
