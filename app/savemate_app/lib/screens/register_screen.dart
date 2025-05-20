import 'package:flutter/material.dart';
import 'package:savemate_app/services/auth_service.dart';

class RegisterScreen extends StatefulWidget {
  @override
  _RegisterScreenState createState() => _RegisterScreenState();
}

class _RegisterScreenState extends State<RegisterScreen> {
  final _nameController = TextEditingController();
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  String? errorMsg;

  Future<void> register() async {
    final res = await AuthService.register(
      _nameController.text,
      _emailController.text,
      _passwordController.text,
    );

    if (res['statusCode'] == 201) {
      Navigator.pop(context); // Go back to Login
    } else {
      setState(() => errorMsg = res['body']['message'] ?? 'Registration failed');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey[100],
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 24.0, vertical: 60.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Center(
                child: Column(
                  children: [
                    Icon(Icons.account_balance_wallet_rounded, size: 80, color: Colors.green[700]),
                    SizedBox(height: 12),
                    Text('SaveMate', style: TextStyle(fontSize: 28, fontWeight: FontWeight.bold, color: Colors.green[800])),
                    SizedBox(height: 4),
                    Text('Create your account ✨', style: TextStyle(fontSize: 16)),
                  ],
                ),
              ),
              SizedBox(height: 40),
              TextField(
                controller: _nameController,
                decoration: InputDecoration(
                  prefixIcon: Icon(Icons.person),
                  labelText: 'Full Name',
                  border: OutlineInputBorder(borderRadius: BorderRadius.circular(10)),
                  filled: true,
                  fillColor: Colors.white,
                ),
              ),
              SizedBox(height: 20),
              TextField(
                controller: _emailController,
                keyboardType: TextInputType.emailAddress,
                decoration: InputDecoration(
                  prefixIcon: Icon(Icons.email),
                  labelText: 'Email',
                  border: OutlineInputBorder(borderRadius: BorderRadius.circular(10)),
                  filled: true,
                  fillColor: Colors.white,
                ),
              ),
              SizedBox(height: 20),
              TextField(
                controller: _passwordController,
                obscureText: true,
                decoration: InputDecoration(
                  prefixIcon: Icon(Icons.lock),
                  labelText: 'Password',
                  border: OutlineInputBorder(borderRadius: BorderRadius.circular(10)),
                  filled: true,
                  fillColor: Colors.white,
                ),
              ),
              SizedBox(height: 30),
              SizedBox(
                width: double.infinity,
                height: 50,
                child: ElevatedButton(
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Colors.green[700],
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                  ),
                  onPressed: register,
                  child: Text('Register', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
                ),
              ),
              SizedBox(height: 20),
              Center(
                child: GestureDetector(
                  onTap: () => Navigator.pop(context),
                  child: Text("Already have an account? Login here",
                      style: TextStyle(color: Colors.green[800], decoration: TextDecoration.underline)),
                ),
              ),
              if (errorMsg != null) ...[
                SizedBox(height: 20),
                Center(child: Text(errorMsg!, style: TextStyle(color: Colors.red))),
              ]
            ],
          ),
        ),
      ),
    );
  }
}
