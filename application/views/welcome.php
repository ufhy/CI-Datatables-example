<table id="example" class="display" cellspacing="0" width="100%" 
			data-ajax-url="<?php echo site_url('api/datatables') ?>"
			data-csrf-name="<?php echo $csrf['name']; ?>"
			data-csrf-value="<?php echo $csrf['hash']; ?>">
	<thead>
		<tr>
			<th>First name</th>
			<th>Last name</th>
			<th>Position</th>
			<th>Office</th>
			<th>Start date</th>
			<th>Salary</th>
		</tr>
	</thead>
	<tfoot>
		<tr>
			<th>First name</th>
			<th>Last name</th>
			<th>Position</th>
			<th>Office</th>
			<th>Start date</th>
			<th>Salary</th>
		</tr>
	</tfoot>
</table>

<script src="<?php echo base_url('assets/js/dataTables.js'); ?>"></script>
<script src="<?php echo base_url('assets/js/welcome.js'); ?>"></script>
