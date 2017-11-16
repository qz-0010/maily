const keys = require("../../config/keys");

module.exports = (src) => {
	return `
		<html>
			<body>
				<div style="text-align: center;">
					<h3>Hello Email</h3>
					<p>${src.body}</p>
					<div>
						<a href="${keys.redirectDomain}/yes_no/thanks">Yes</a>
					</div>
					<div>
						<a href="${keys.redirectDomain}/yes_no/thanks">No</a>
					</div>
				</div>
			</body>
		</html>
	`
}