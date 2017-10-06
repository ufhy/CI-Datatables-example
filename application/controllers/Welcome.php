<?php

class Welcome extends CI_Controller {

	public function index()
	{
		// generate csrf atau gunakan metode sendiri
		$data['csrf'] = array(
			'name' => $this->security->get_csrf_token_name(),
			'hash' => $this->security->get_csrf_hash()
		); 

		$this->load->view('welcome', $data);
	}

}
